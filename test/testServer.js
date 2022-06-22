const { parseRequestLine, getResponse } = require("../server");
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


