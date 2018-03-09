var fs = require('fs');
var childProcess = require('child_process');
var del = require('del');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var template = require('gulp-template');
var service = require('gulp-koa');
var nodemon = require('gulp-nodemon');
const svgSymbols = require(`gulp-svg-symbols`);
const myIconJS = require('./assets/js/gulp-my-icons');
var fontName = 'my-icons';

/**
 * options for gulp-iconfont-css
 * 1. targetPath
 * The path where the (S)CSS file should be saved, relative to the path used in gulp.dest() (optional, 
 * defaults to _icons.css).
 * 2. path
 * The template path for (S)CSS
 */
gulp.task('iconfont', function() {
  return gulp.src(['assets/svg-font/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'assets/scss/_icons.scss.model',
      cssClass: 'my-icon',
      targetPath: '../scss/_icons.scss',
      fontPath: '../fonts/',
      centerHorizontally: true
    }))
    .pipe(iconfont({
      fontName: fontName,
      fontHeight: 1001, //(>= 1000)
      normalize: true
    }))
    .pipe(gulp.dest('output/assets/fonts/'));
});

// copy my-icons.scss from assets to output
gulp.task('copy-scss', function() {
  return gulp.src('assets/scss/my-icons.scss')
    .pipe(gulp.dest('output/assets/scss/'));
});

gulp.task('sass', ['copy-scss', 'iconfont'], function() {
  return gulp.src('./output/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./output/assets/css'));
});

gulp.task('svg-js', ['clean'], () => {
  gulp.src('assets/svg-js/*.svg').pipe(svgSymbols({
    slug: function(name) {
      return `my-icon-${name}`
    },
  }))
  .pipe(myIconJS('my-icons.js'))
  .pipe(gulp.dest('output/assets/css'))
});

gulp.task('template', function() {
  gulp.src('assets/template/index.html')
    .pipe(template({
      'svgFont': fs.readdirSync('./assets/svg-font/').filter(name => {
        return name.endsWith('.svg');
      }).map(function(name) {
        return name.replace(/\.[^/.]+$/, '');
      }),
      'svgSymbols': fs.readdirSync('./assets/svg-js/').filter(name => {
        return name.endsWith('.svg');
      }).map(function(name) {
        return name.replace(/\.[^/.]+$/, '');
      }),
    }))
    .pipe(gulp.dest('output'));
});

gulp.task('clean', function() {
  return del.sync(['./output/*'], {
    force: true
  });
});

gulp.task('server', ['clean', 'sass', 'svg-js', 'template'], function() {
  // server.run(['app.js']);
  // gulp.watch(['**/*.html'], server.notify);
  // childProcess.exec('nodemon app.js', (err, stdout, stderr) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(stdout);
  // });
  // gulp.src('.')
  // .pipe(service('app.js', {env: {}}));

  nodemon({
    script: 'app.js',
  })

  gulp.watch(['assets/**/*.scss'], ['sass', 'template']);
  gulp.watch(['assets/**/*.html'], ['sass', 'template']);
  gulp.watch(['assets/svg-font/*.svg'], ['sass', 'template']);
});