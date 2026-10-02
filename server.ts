import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './backend/routes/contact.ts';
import { errorHandler } from './backend/middleware/errorHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Security headers with helmet (configured to not break WebGL/Vite)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS configuration
  // CLIENT_URL is optional during development / preview.
  // If CLIENT_URL is not set or is empty, automatically allow the incoming request origin (AI Studio preview, localhost, etc.).
  // When deploying to production with CLIENT_URL defined, restrict to the specified origin(s).
  const configuredClientUrl = process.env.CLIENT_URL?.trim();

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. same-origin relative requests, server-to-server, curl)
        if (!origin) {
          return callback(null, true);
        }

        // If production CLIENT_URL is provided, enforce it
        if (configuredClientUrl && configuredClientUrl.length > 0) {
          const allowedOrigins = configuredClientUrl
            .split(',')
            .map((url) => url.trim().replace(/\/$/, ''));
          const normalizedOrigin = origin.replace(/\/$/, '');

          if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
          }

          // If in development mode, allow preview origin as well
          if (!isProd) {
            return callback(null, true);
          }

          return callback(new Error(`CORS blocked for origin: ${origin}`));
        }

        // If CLIENT_URL is empty / unset during development or preview, automatically allow
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Request size limits & body parsers
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // API Routes
  app.use('/api', contactRoutes);

  // Standalone health endpoint as requested in spec
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite integration
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  // Centralized Error Handler
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Dhirendra Dubey Portfolio Server] Active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Startup Error]', err);
  process.exit(1);
});
