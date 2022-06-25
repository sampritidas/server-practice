const responseBody = (data) => `<html><body><h1>${data}</h1></body></html>`;

const formatResponse = (data) => {
  const responseHeader = 'HTTP/1.1 200';
  const body = responseBody(data);
  return `${responseHeader}\r\n\r\n${body}\r\n`;
};

const dynamicResponse = (response, { uri }, headers) => {
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

module.exports = { dynamicResponse, responseBody, formatResponse };
