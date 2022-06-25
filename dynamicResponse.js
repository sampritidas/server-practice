const responseBody = (data) => `<html><body><h1>${data}</h1></body></html>`;

const formatResponse = (data) => {
  const responseHeader = 'HTTP/1.1 200';
  const body = responseBody(data);
  return `${responseHeader}\r\n\r\n${body}\r\n`;
};

const _dynamicResponse = (response, { uri }, headers) => {
  if (uri === '/') {
    response.write(formatResponse('hello'));
    return true;
  }
  if (uri === '/nilam') {
    response.write(formatResponse('hello I am Nilam'));
    return true;
  }
  response.write(formatResponse('Invalid'));
  return false;
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

const dynamicResponse = (response, { protocol, uri }, staticRoot) => {
  const [parsedUri, queries] = parseUri(uri);
  console.log('p', parsedUri, queries);
  if (parsedUri === '/max') {
    return max(response, protocol.trim(), queries);
  }
  if (parsedUri === '/redirect') {
    return redirect(response, protocol.trim());
  }
  if (parsedUri === '/index') {
    return index(response, protocol.trim());
  }
  return false;
}

module.exports = { dynamicResponse, responseBody, formatResponse };
