/**
 * Servidor MCP local para desarrollo
 * Permite que Cursor u otras herramientas de IA consulten la documentación
 *
 * Uso: node mcp-server.mjs
 * Luego conecta Cursor a http://localhost:3456
 */
import http from 'http';
import { McpDocsServer } from 'docusaurus-plugin-mcp-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mcpServer = new McpDocsServer({
  docsPath: path.join(__dirname, 'build/mcp/docs.json'),
  indexPath: path.join(__dirname, 'build/mcp/search-index.json'),
  name: 'sipay-documentacion',
  baseUrl: 'http://localhost:3000',
});

// Cola para serializar peticiones: el MCP Server solo admite una conexión a la vez
let requestQueue = Promise.resolve();

function queueRequest(handler) {
  const current = requestQueue;
  requestQueue = current.then(handler, handler);
  return requestQueue;
}

http.createServer(async (req, res) => {
  // CORS: permite peticiones desde Cursor u otros clientes
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id, Last-Event-ID',
    });
    res.end();
    return;
  }

  // El protocolo Streamable HTTP usa GET (SSE), POST (JSON-RPC) y DELETE (cerrar sesión)
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }

  // Para POST necesitamos parsear el body antes de pasarlo al transport
  let parsedBody;
  if (req.method === 'POST') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString('utf8');
    try {
      parsedBody = body ? JSON.parse(body) : undefined;
    } catch {
      parsedBody = undefined;
    }
  }

  await queueRequest(async () => {
    try {
      await mcpServer.handleHttpRequest(req, res, parsedBody);
    } catch (err) {
      console.error('[MCP] Error handling request:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    }
  });
}).listen(3456, () => {
  console.log('');
  console.log('Servidor MCP de documentación Sipay');
  console.log('=====================================');
  console.log('   URL: http://localhost:3456');
  console.log('');
  console.log('Para conectar en Cursor, añade en tu configuración MCP:');
  console.log('   "sipay-docs": { "url": "http://localhost:3456" }');
  console.log('');
});