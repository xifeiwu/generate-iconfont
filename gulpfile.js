var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var server = require('gulp-express');
var template = require('gulp-template');

var fontName = 'my-icons';

gulp.task('iconfont', function () {
  gulp.src(['assets/icons/*.svg'])
  .pipe(iconfontCss({
    fontName: fontName,
    path: 'assets/scss/_icons.scss',
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

gulp.task('font-scss', ['iconfont'], function() {
  return gulp.src('assets/scss/my-icon.scss')
      .pipe(gulp.dest('output/assets/scss/'));
});

gulp.task('sass', ['font-scss'], function () {
  return gulp.src('./output/assets/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./output/assets/css'));
});

gulp.task('template', function () {
  gulp.src('assets/template/index.html')
  .pipe(template({
    'icons': fs.readdirSync('./assets/icons/').map(function (name) {
      return name.replace(/\.[^/.]+$/, '');
    })
  }))
  .pipe(gulp.dest('output'));
});

gulp.task('clean', function() {
    return del.sync(['./output/*'], {
        force: true
    });
});

gulp.task('server', ['clean','sass', 'template'], function () {
  server.run(['app.js']);
  gulp.watch(['**/*.html'], server.notify);
  gulp.watch(['assets/**/*.scss'], ['sass', 'template']);
  gulp.watch(['assets/**/*.html'], ['sass', 'template']);
  gulp.watch(['assets/**/*.svg'], ['sass', 'template']);
});
