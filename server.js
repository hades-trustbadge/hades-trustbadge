const path = require('path');
const crypto = require('crypto');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const fetchFn =
  globalThis.fetch ||
  ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_AUTH_TOKEN = (process.env.API_AUTH_TOKEN || '').trim();
const API_ALLOWED_ORIGINS = (process.env.API_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)
  .map(entry => {
    try {
      const parsed = new URL(entry);
      return { origin: parsed.origin.toLowerCase(), host: parsed.hostname.toLowerCase() };
    } catch {
      return { origin: null, host: entry.toLowerCase() };
    }
  });
const API_AUTH_TOKEN_BUFFER = API_AUTH_TOKEN ? Buffer.from(API_AUTH_TOKEN) : null;

function collectOriginCandidates(req) {
  const candidates = [];
  const seen = new Set();

  function addCandidate(value) {
    if (!value) return;

    try {
      const parsed = new URL(value);
      const origin = parsed.origin.toLowerCase();
      const host = parsed.hostname.toLowerCase();

      if (origin && !seen.has(`origin:${origin}`)) {
        seen.add(`origin:${origin}`);
        candidates.push({ type: 'origin', value: origin });
      }

      if (host && !seen.has(`host:${host}`)) {
        seen.add(`host:${host}`);
        candidates.push({ type: 'host', value: host });
      }
    } catch {
      const host = value.toLowerCase().split('/')[0];
      if (host && !seen.has(`host:${host}`)) {
        seen.add(`host:${host}`);
        candidates.push({ type: 'host', value: host });
      }
    }
  }

  addCandidate(req.get('origin'));
  addCandidate(req.get('referer'));
  addCandidate(req.get('host') ? `http://${req.get('host')}` : null);
  addCandidate(req.hostname ? `http://${req.hostname}` : null);

  return candidates;
}

function isOriginAllowed(req) {
  if (!API_ALLOWED_ORIGINS.length) {
    return true;
  }

  const candidates = collectOriginCandidates(req);

  return candidates.some(candidate =>
    API_ALLOWED_ORIGINS.some(allowed => {
      if (candidate.type === 'origin' && allowed.origin) {
        return candidate.value === allowed.origin;
      }

      if (candidate.type === 'host') {
        return candidate.value === allowed.host;
      }

      return false;
    })
  );
}

function ensureAuthenticated(req, res, next) {
  if (!API_AUTH_TOKEN_BUFFER) {
    return res
      .status(500)
      .json({ error: 'API_AUTH_TOKEN não configurada no servidor.' });
  }

  if (!isOriginAllowed(req)) {
    return res.status(403).json({ error: 'Origem não autorizada.' });
  }

  const authorizationHeader = req.headers.authorization || '';
  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7).trim()
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Credenciais ausentes.' });
  }

  const providedBuffer = Buffer.from(token);

  if (
    providedBuffer.length !== API_AUTH_TOKEN_BUFFER.length ||
    !crypto.timingSafeEqual(providedBuffer, API_AUTH_TOKEN_BUFFER)
  ) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  next();
}

app.use(express.json({ limit: '1mb' }));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ai', ensureAuthenticated, async (req, res) => {
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY não configurada.' });
  }

  const { mode = 'text', content } = req.body || {};

  if (typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({ error: 'Envie um conteúdo em texto para processar.' });
  }

  const systemPrompt = mode === 'html'
    ? 'Você é um expert em newsletters. Melhore o HTML fornecido tornando-o mais profissional, responsivo e bonito. Mantenha o conteúdo original mas aprimore o design, cores, tipografia e layout. Retorne APENAS o HTML melhorado, pronto para renderizar.'
    : 'Você é um expert em criar newsletters em HTML. Converta o texto fornecido em um HTML de newsletter profissional e bonito. Retorne APENAS o HTML sem explicações, pronto para renderizar. Use inline CSS quando necessário.';

  try {
    const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `${mode === 'html' ? 'Melhore este HTML' : 'Converta este texto'} de newsletter:\n\n${content}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const message = errorPayload?.error?.message || `API Error ${response.status}`;
      return res.status(response.status).json({ error: message });
    }

    const payload = await response.json();
    const message = payload?.choices?.[0]?.message?.content;

    if (!message) {
      return res.status(502).json({ error: 'Resposta inesperada da API da OpenAI.' });
    }

    res.json({ html: message });
  } catch (error) {
    const status = error?.status || 500;
    const message = error?.message || 'Erro desconhecido';
    res.status(status).json({ error: message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
