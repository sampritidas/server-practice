const { on } = require('events');
const { createServer } = require('net');

const responseHeader = 'HTTP/1.1 200';

const responseBody = (data) => `<html><body><h1>${data}</h1></body></html>`;

const response = (data) => {
  const body = responseBody(data);
  return `${responseHeader}\r\n\r\n${body}\r\n`;
}

const parseRequestLine = (requestLine) => {
  const [verb, path, protocol] = requestLine.split(' ');
  return { verb, path, protocol };
};

const separateByColon = (header) => {
  const indexOfColon = header.indexOf(':');
  const key = header.slice(0, indexOfColon);
  const value = header.slice(indexOfColon);
  return [key, value];
};

const parseHeader = (header) => {
  const headers = {};
  let index = 0;
  while (index < header.length && header[index].length > 0) {
    const [key, value] = separateByColon(header[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const getResponse = ({ path }) => {
  if (path === '/') {
    return response('hello');
  }
};

const onResponse = (socket, requestLine, headers) => {
  console.log(requestLine, headers);
  const response = getResponse(requestLine);
  socket.write(response);
  socket.end();
};

const runServer = (PORT, handler) => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');
    process.stdin.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const request = chunk.split('\r\n');
      const requestLine = parseRequestLine(request[0]);
      const headers = parseHeader(request.slice(1));
      handler(socket, requestLine, headers);
    })
  });

  server.listen(PORT, () => console.log(`Listening to ${PORT}`));
};


const main = () => {
  const PORT = 4444;
  runServer(PORT, onResponse);
}

main();

module.exports = { parseRequestLine, getResponse };
