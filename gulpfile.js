var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var server = require('gulp-express');

var fontName = 'Icons';

gulp.task('iconfont', function(){
  gulp.src(['app/assets/icons/*.svg'])
  .pipe(iconfontCss({
    fontName: fontName,
    path: 'app/assets/scss/templates/_icons.scss',
    targetPath: '../../scss/_icons.scss',
    fontPath: '../fonts/icons/'
  }))
  .pipe(iconfont({
    fontName: fontName
  }))
  .pipe(gulp.dest('app/assets/fonts/icons/'));
});

gulp.task('sass',['iconfont'], function () {
  return gulp.src('./app/assets/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('server', ['sass'], function () {
  server.run(['app.js']);
  // Restart the server when file changes
  gulp.watch(['app/**/*.html'], server.notify);
  gulp.watch(['app/assets/**/*.scss'], ['sass']);
  gulp.watch(['app/assets/**/*.svg'], ['sass']);
});
