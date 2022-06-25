const assert = require('assert');
const { formatResponse, responseBody } = require('../dynamicResponse.js');
const { parseRequestLine, separateByColon, parseHeader } = require('../parseRequest.js');

describe('parseRequestLine', () => {
  it('Should return the object of verb, uri, protocol', () => {
    const exp = { verb: 'GET', uri: '/', protocol: 'HTTP/1.1' }
    assert.deepStrictEqual(
      parseRequestLine('GET / HTTP/1.1'), exp);
  });
});

describe('formatResponse', () => {
  it('Should give html contains "hello" if uri"/"', () => {
    const input = 'hello';
    const exp = 'HTTP/1.1 200\r\n\r\n<html><body><h1>hello</h1></body></html>\r\n'
    assert.strictEqual(formatResponse(input), exp);
  });
});

describe('responseBody', () => {
  it('Should return responeHeader and  html', () => {
    const exp = '<html><body><h1>hello</h1></body></html>'
    assert.strictEqual(responseBody('hello'), exp);
  });
});

describe('separateByColon', () => {
  it('Should give key and value in array', () => {
    const exp = ['host', 'localhost'];
    assert.deepStrictEqual(
      separateByColon('host: localhost'), exp);
  });
});

describe('parseHeader', () => {
  it('Should return parsed header', () => {
    const act = ['host: localhost', 'user-agent: me'];
    const exp = { host: 'localhost', 'user-agent': 'me' };
    assert.deepStrictEqual(parseHeader(act), exp);
  });
});
