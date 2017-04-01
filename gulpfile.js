var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'Icons';

gulp.task('iconfont', function(){
  gulp.src(['app/assets/icons/*.svg'])
  .pipe(iconfontCss({
    fontName: fontName,
    path: 'app/assets/css/templates/_icons.scss',
    targetPath: '../../css/_icons.scss',
    fontPath: '../../fonts/icons/'
  }))
  .pipe(iconfont({
    fontName: fontName
  }))
  .pipe(gulp.dest('app/assets/fonts/icons/'));
});
