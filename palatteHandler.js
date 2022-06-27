const { getWebsite } = require("./colorPalatte.js");
const { parseUri } = require("./dynamicResponse.js");

const palatte = (response, protocol, queries) => {
  const { row, column } = queries;
  const content = getWebsite(row, column);
  response.setHeader('content-type', 'text/html');
  response.statuscode = 200;
  response.send(protocol, content);
  return true;
};

const palatteHandler = ({ protocol, uri }, response, staticRoot) => {
  const [parsedUri, queries] = parseUri(uri);
  console.log(parsedUri, queries);
  if (parsedUri === '/palatte') {
    return palatte(response, protocol.trim(), queries);
  }
  return false;
}

module.exports = { palatteHandler };
