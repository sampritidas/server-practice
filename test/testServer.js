const { parseRequestLine, getResponse, responseBody, response, separateByColon, parseHeader } = require("../src/server");

const assert = require('assert');

describe('parseRequestLine', () => {
  it('Should return the object of verb, path, protocol', () => {
    const exp = { verb: 'GET', path: '/', protocol: 'HTTP/1.1' }
    assert.deepStrictEqual(
      parseRequestLine('GET / HTTP/1.1'), exp);
  });
});

describe('getResponse', () => {
  it('Should give html contains "hello" if path"/"', () => {
    const input = { path: '/' };
    const exp = 'HTTP/1.1 200\r\n\r\n<html><body><h1>hello</h1></body></html>\r\n'
    assert.strictEqual(getResponse(input), exp);
  });
});

describe('responseBody', () => {
  it('Should return responeHeader and  html', () => {
    const exp = '<html><body><h1>hello</h1></body></html>'
    assert.strictEqual(responseBody('hello'), exp);
  });
});

describe('response', () => {
  it('Should return response string', () => {
    const exp = 'HTTP/1.1 200\r\n\r\n<html><body><h1>hi</h1></body></html>\r\n'
    assert.strictEqual(response('hi'), exp);
  });
});

describe('separateByColon', () => {
  it('Should give key and value in array', () => {
    const exp = ['host ', ' localhost'];
    assert.deepStrictEqual(
      separateByColon('host : localhost'), exp);
  });
});

describe('parseHeader', () => {
  it('Should return parsed header', () => {
    const act = ['host: localhost', 'user-agent: me'];
    const exp = { host: ' localhost', 'user-agent': ' me' };
    assert.deepStrictEqual(parseHeader(act), exp);
  });
});
