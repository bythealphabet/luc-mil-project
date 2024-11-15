import path from 'path';
import { createServer as createViteServer } from 'vite';
import express, { Express, Request, Response } from 'express';
import template from '../template';
import { config } from '../config/config';
import authRoutes from './routes/auth.routes';

async function createServer() {
  const app: Express = express();
  const vite = await createViteServer({
    server: { middlewareMode: true, port: config.port, host: '0.0.0.0' },
    appType: 'custom',
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(vite.middlewares);

  const CURRENT_WORKING_DIR: string = process.cwd();
  app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

  app.use('/', authRoutes);

  app.use('*', async (req: Request, res: Response) => {
    let render;
    const url = req.originalUrl.replace('/', '');
    try {
      render = (await vite.ssrLoadModule('./server/renderer.tsx')).render;
      const renderTemplate = await vite.transformIndexHtml(url, template());

      const html = renderTemplate
        .replace(`<!--app-head-->`, render().head ?? '')
        .replace(`<!--app-html-->`, render().html ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      console.log(e);
    }
  });

  return app;
}

export default createServer;
