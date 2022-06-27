const fs = require('fs');

const randomColor = function () {
  return Math.ceil(Math.random() * 255);
};

const createClass = function (classAttr) {
  return ' class="' + classAttr.join(' ') + '"';
};

const createStyle = function (styleAttr) {
  const attribs = Object.keys(styleAttr).map(function (key) {
    return key + ': ' + styleAttr[key];
  }).join(', ');
  return ' style="' + attribs + '"';
};

const tagWithAttributes = function (tagName, classAttr, styleAttr, content) {
  const classes = createClass(classAttr);
  const style = createStyle(styleAttr);
  return ['<', tagName, classes, style, '>\n', content, ' </', tagName, '>\n'];
};

const nestedTag = function (tagName, classes, styles, number) {
  return Array(number).fill(0).reduce(function (content) {
    return tagWithAttributes(tagName, classes, styles, content).join('');
  }, '');
};

const getColor = function () {
  const color = 'rgba(' + [randomColor(), ',', randomColor(), ',', randomColor(), ',', 0.1].join('') + ')';
  return color;
};

const palatteDiv = function (palatteNum) {
  const color = getColor();
  const height = this;
  return tagWithAttributes('div', ['palatte'],
    { 'height': height },
    nestedTag('div', [], { 'background-color': color }, palatteNum)).join('');
};

const outerDiv = function (blockNum, palatteNum) {
  console.log('row', blockNum, 'column', palatteNum);
  const height = Math.floor(100 / blockNum) + '%';
  const div = palatteDiv.bind(height);
  const palattes = Array(blockNum).fill(palatteNum).map(div).join('');
  return tagWithAttributes('div', ['outer'], '', palattes).join('');
};

const createHead = function () {
  const link = '<link rel="stylesheet" href="styles.css">';
  return tagWithAttributes('head', [], {}, link).join('');
};

const colorBlock = function (blockNum, patternNum) {
  const head = createHead();
  const body = tagWithAttributes('body', [], {}, outerDiv(blockNum, patternNum)).join('');
  return tagWithAttributes('html', [], {}, head + body).join('');
};

const getWebsite = function (rowNum, columnNum) {
  const htmlBlock = colorBlock(+rowNum, +columnNum);
  return htmlBlock;
  // fs.writeFileSync('./colorPalatte.html', htmlBlock, 'utf8');
};

// getWebsite(...process.argv.slice(2));

module.exports = { outerDiv, getWebsite };
