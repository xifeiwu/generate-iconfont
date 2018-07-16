const http = require('http');
const url = require('url');
const path = require('path');
const util = require('util');
const fs = require('fs');
const promisifyReadFile = util.promisify(fs.readFile);
const promisifyFsExists = util.promisify(fs.exists);

class Server {
  constructor() {
    this.IP = 'localhost';
    this.port = 3030;
    this.destDir = 'output';
  }

  parseUrl(request) {
    var urlString = 'http://' + request.headers['host'] + request.url;
    var obj = url.parse(urlString);
    if (obj.query) {
      obj.query = this.parseQueryString(obj.query);
    }
    return obj;
  }

  start() {
    var server = http.createServer((request, response) => {
      // this.showRequest(request);
      let parsedUrl = this.parseUrl(request);
      let method = request.method;
      let pathname = parsedUrl.pathname;
      // console.log(parsedUrl);
      // console.log(method);

      switch (method.toLowerCase()) {
        case 'get':
          this.responseGet(pathname, response);
          break;
        case 'post':
          var postData = '';
          request.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
          });
          request.addListener('end', () => {
            response.write(`your pathname is ${pathname}`);
            response.end(postData);
            console.log(postData);
          });
          request.on('error', function(err) {
            console.error(err.stack);
            reject(err);
          });
          break;
      }
    }).listen(this.port);
    server.on('error', (err) => {
      // console.log(err);
      this.port += 1;
      this.start()
    });
    server.on('listening', () => {
      console.log('start server: http://' + this.IP + ':' + this.port);
    });
  }

  async responseGet(pathname, response) {
    let fileName = pathname.substring(1);
    if (!fileName) {
      fileName = 'index.html';
    }
    // console.log(__dirname, fileName);
    try {
      let filePath = path.resolve(__dirname, this.destDir, fileName);
      // console.log(filePath);
      if (await promisifyFsExists(filePath)) {
        fs.createReadStream(filePath, {
          bufferSize: 64 * 1024 * 1024
        }).pipe(response);
      } else {
        response.end(`your pathname is ${pathname}`);
      }
    } catch(err) {
      response.end(`error: ${err.message}`);

    }
  }
}

new Server().start();