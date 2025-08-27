import type { VercelRequest, VercelResponse } from '@vercel/node';

let server: any;

async function getServer() {
  if (!server) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const createNestServer = require('../dist/serverless.js').default;
    const expressApp = await createNestServer();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createServer } = require('http');
    server = createServer(expressApp);
  }
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const s = await getServer();
  s.emit('request', req, res);
}


