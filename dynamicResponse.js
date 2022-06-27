const responseBody = (data) => `<html><body><h1>${data}</h1></body></html>`;

const formatResponse = (data) => {
  const responseHeader = 'HTTP/1.1 200';
  const body = responseBody(data);
  return `${responseHeader}\r\n\r\n${body}\r\n`;
};

const parseUri = (rawUri) => {
  const queryParams = {};
  const [uri, params] = rawUri.split('?');

  if (params) {
    const queries = params.split('&');
    queries.forEach((param) => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    })
  }
  return [uri, queryParams];
};

const max = (response, protocol, queries) => {
  const { a, b } = queries;
  const result = Math.max(a, b);

  response.setHeader('content-type', 'text/plain');
  response.statuscode = 200;
  response.send(protocol, `max(${a}, ${b}) = ${result}`);
  return true;
};

const redirect = (response, protocol) => {
  response.setHeader('Location', '/index');
  response.statuscode = 301;
  return true;
};

const index = (response, protocol) => {
  response.setHeader('content-type', 'text/plain');
  response.statuscode = 200;
  response.send(protocol, `I am redirected`);
  return true;
};

const gaint = (response, protocol, queries) => {
  const { head, body } = queries;
  console.log(queries);
  response.setHeader('content-type', 'text/plain');
  response.statuscode = 200;
  response.send(protocol, `head is ${head} and body is ${body}`);
  return true;
};

const calculateHex = (value) => {
  const firstDigit = Math.floor(value / 16);
  const secondDigit = (value / 16 - firstDigit) * 16;
  return firstDigit.toString(16) + secondDigit.toString(16);
};

const getHex = (red, green, blue) => {
  return calculateHex(red) + calculateHex(green) + calculateHex(blue);
};

const getHeader = (red, green, blue) => {
  return `<h3>RED = ${red} GREEN = ${green} BLUE = ${blue}</h3>`;
};

const getDiv = (hex) => {
  return `<div style="height:300; width: 300; background-color: ${hex}; border: 2px solid black"></div>`;
};

const combinedBox = (red, green, blue, hex) => {
  const header = getHeader(red, green, blue);
  const div = getDiv(hex);
  return `${header}${div}`;
};

const combine = (response, protocol, queries) => {
  const { red, green, blue } = queries;
  const hex = getHex(red, green, blue);
  const content = combinedBox(red, green, blue, hex);
  console.log(content);
  response.setHeader('content-type', 'text/html');
  response.statuscode = 200;
  response.send(protocol, content);
  return true;
};

const dynamicResponse = ({ protocol, uri }, response, staticRoot) => {
  const [parsedUri, queries] = parseUri(uri);
  console.log(parsedUri, queries);
  if (parsedUri === '/max') {
    return max(response, protocol.trim(), queries);
  }
  if (parsedUri === '/redirect') {
    return redirect(response, protocol.trim());
  }
  if (parsedUri === '/index') {
    return index(response, protocol.trim());
  }
  if (parsedUri === '/gaint') {
    return gaint(response, protocol.trim(), queries);
  }
  if (parsedUri === '/combine') {
    return combine(response, protocol.trim(), queries);
  }
}

module.exports = { dynamicResponse, responseBody, formatResponse, parseUri };
