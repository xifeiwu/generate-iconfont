'use strict';

var Stream = require('stream');
var Path = require('path');

function gulpRename(obj) {

  var stream = new Stream.Transform({objectMode: true});

  function parsePath(path) {
    var extname = Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path, extname),
      extname: extname
    };
  }

  stream._transform = function (originalFile, unused, callback) {
    console.log(typeof originalFile);
    console.log(Object.keys(originalFile));
    console.log(originalFile.history);
    console.log(originalFile.cwd);
    console.log(originalFile.base);
    console.log(originalFile.stat);
    console.log(originalFile._contents.toString());

    var file = originalFile.clone({contents: false});

    callback(null, file);
  };

  return stream;
}

module.exports = gulpRename;