"use strict";

var _require = require('./util'),
    stripScript = _require.stripScript,
    stripTemplate = _require.stripTemplate,
    genInlineComponentText = _require.genInlineComponentText;

var md = require('./config');

module.exports = function (source) {
  var content = md.render(source);
  var startTag = '<!--element-demo:';
  var startTagLen = startTag.length;
  var endTag = ':element-demo-->';
  var endTagLen = endTag.length;
  var componenetsString = '';
  var id = 0; // demo 的 id

  var output = []; // 输出的内容

  var start = 0; // 字符串开始位置

  var commentStart = content.indexOf(startTag);
  var commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));
    var commentContent = content.slice(commentStart + startTagLen, commentEnd);
    var html = stripTemplate(commentContent);
    var script = stripScript(commentContent);
    var demoComponentContent = genInlineComponentText(html, script);
    var demoComponentName = "element-demo".concat(id);
    output.push("<template slot=\"source\"><".concat(demoComponentName, " /></template>"));
    componenetsString += "".concat(JSON.stringify(demoComponentName), ": ").concat(demoComponentContent, ","); // 重新计算下一次的位置

    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  } // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑


  var pageScript = '';

  if (componenetsString) {
    pageScript = "<script>\n      export default {\n        name: 'component-doc',\n        components: {\n          ".concat(componenetsString, "\n        }\n      }\n    </script>");
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  console.log(output.join(''));
  return "\n    <template>\n      <section class=\"content blog-doc\">\n        ".concat(output.join(''), "\n      </section>\n    </template>\n    ").concat(pageScript, "\n  ");
};