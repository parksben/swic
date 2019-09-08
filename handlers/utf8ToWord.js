// utf8ToWord
module.exports = text => {
  if (!text) return '';
  const pattForUtf8 = /&#x([^;]+);/g;
  return text.replace(pattForUtf8, (s, s1) =>
    String.fromCharCode(parseInt(s1, 16).toString(10))
  );
};
