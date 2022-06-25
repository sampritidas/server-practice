const fs = require('fs');

const extentions = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
}

const getContentType = (filename) => {
  const indexOfExtention = filename.lastIndexOf('.');
  const extention = filename.slice(indexOfExtention);
  return extentions[extention] ? extentions[extention] : 'text/plain';
};

const path = (staticRoot, uri) => {
  return (staticRoot === undefined ? '.' : staticRoot) + uri;
};

const serveFileContent = (response, { uri, protocol }, staticRoot) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const filename = path(staticRoot, uri);
  console.log('path', filename);

  if (!fs.existsSync(filename)) {
    response.statuscode = 404;
    response.send(protocol, 'file not found');
    return false;
  }

  const contentType = getContentType(filename);
  console.log('type', contentType);

  const content = fs.readFileSync(filename);

  response.setHeader('content-type', contentType);
  response.send(protocol.trim(), content);
  return true;
};

module.exports = { serveFileContent };
