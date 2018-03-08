// var express = require('express');
// var app = express();

// app.use(express.static('output'))

// app.listen(3000, function () {
//  console.log('Example app listening on port 3000!')
// });
const path = require('path');
const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const app = new Koa();

app.use(koaStaticCache(
  path.resolve(__dirname, 'output'),
  {
    maxAge: 0,
    // maxAge: 3600 * 24,
    gzip: false,
    buffer: false,
    preload: false,
    // prefix: 'assets',
    // preload: false,
    alias: {
      '/index': '/index.html',
      '/': '/index.html'
    }
  }
));

app.listen(9002);