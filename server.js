const { createServer } = require('net');
const { parseChunk } = require("./parseRequest.js");
const { dynamicResponse } = require("./dynamicResponse.js");
const { serveFileContent } = require('./serveFileContent.js');
const { Response } = require('./response.js');

const countViews = () => {
  let count = 0;
  return (response, { protocol, uri }, staticRoot) => {
    console.log(response);
    count++;
    if (uri === '/view') {
      response.send(protocol.trim(), `File views ${count} times`);
      return true;
    }
    return false;
  }
};

const handlers = [countViews(), serveFileContent, dynamicResponse];

const handle = (handlers) => {
  return (response, request, staticRoot) => {
    for (const handler of handlers) {
      if (handler(response, request, staticRoot)) {
        return true;
      }
    }
    return false;
  }
};

const runServer = (PORT, staticRoot, handler) => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const [requestLine] = parseChunk(chunk.toString());
      const response = new Response(socket);
      handler(response, requestLine, staticRoot);
    })
  });

  server.listen(PORT, () => console.log(`Listening to ${PORT}`));
};

const main = (staticRoot) => {
  const PORT = 4444;
  runServer(PORT, staticRoot, handle(handlers));
};

main(process.argv[2]);
