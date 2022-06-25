const { createConnection } = require('net');

const HOST = process.argv[2];
const PORT = process.argv[3];
;
const socket = createConnection(PORT);

const hasNewLine = chunk => chunk === '\n';

const main = (socket) => {
  socket.on('data', (chunk) => {
    process.stdout.write(chunk);
  })

  let responses = '';

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    responses += chunk.trim() + '\r\n';
    if (hasNewLine(chunk)) {
      socket.write(responses);
      process.stdin.destroy();
    }
  })
};

main(socket);
