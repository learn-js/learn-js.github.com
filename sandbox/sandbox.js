var CodeMirror = require('codemirror');
require('./javascript')(CodeMirror);

var editor = new CodeMirror(document.body, {
  value: "function myScript(){return 100;}\n",
  mode:  "javascript"
});