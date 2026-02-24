const WebSocket = require("ws");
const http = require("http");
const { setupWSConnection } = require("y-websocket/bin/utils");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("y-websocket server running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (conn, req) => {
  setupWSConnection(conn, req);
});

const PORT = process.env.YJS_PORT || 1234;
server.listen(PORT, () => {
  console.log(`y-websocket server running on port ${PORT}`);
});
