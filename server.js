const { createServer } = require('net');

const response = (data) => `HTTP/1.1 200\r\n\r\n<html><body><h1>${data}</h1></body></html>\r\n`;

const parseRequestLine = (requestLine) => {
  const [verb, path, protocol] = requestLine.split(' ');
  return { verb, path, protocol };
};

const separateByColon = (header) => {
  const keyOfColon = header.indexOf(':');
  const key = header.slice(0, keyOfColon);
  const value = header.slice(keyOfColon);
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

const server = createServer((socket) => {
  socket.setEncoding('utf8');
  process.stdin.setEncoding('utf8');

  socket.on('data', (chunk) => {
    const request = chunk.split('\r\n');
    const requestLine = parseRequestLine(request[0]);
    const headers = parseHeader(request.slice(1));
    onResponse(socket, requestLine, headers);
  })

  process.stdin.on('data', (chunk) => {
    console.log('my', chunk);
    socket.write(chunk);
  })
});

const PORT = 4444;
server.listen(PORT, () => console.log(`Listening to ${PORT}`));
