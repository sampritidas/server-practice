const { createServer } = require('net');
const { parseChunk } = require("./parseRequest.js");
const { dynamicResponse } = require("./dynamicResponse.js");
const { serveFileContent } = require('./serveFileContent.js');
const { palatteHandler } = require('./palatteHandler.js');
const { Response } = require('./response.js');

const countViews = () => {
  let count = 0;
  return (response, { protocol, uri }, staticRoot) => {
    count++;
    if (uri === '/view') {
      response.send(protocol.trim(), `File views ${count} times`);
      return true;
    }
    return false;
  }
};

// const handlers = [countViews(), serveFileContent, dynamicResponse];
const handlers = [palatteHandler, dynamicResponse, serveFileContent];

const handle = (handlers) => {
  return (request, response, staticRoot) => {
    for (const handler of handlers) {
      if (handler(request, response, staticRoot)) {
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
      handler(requestLine, response, staticRoot);
    })
  });

  server.listen(PORT, () => console.log(`Listening to ${PORT}`));
};

const main = (staticRoot) => {
  const PORT = 4444;
  runServer(PORT, staticRoot, handle(handlers));
};

main(process.argv[2]);
