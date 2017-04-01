var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');

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

gulp.task('sass', function () {
  return gulp.src('./app/assets/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./app/assets/css'));
});
