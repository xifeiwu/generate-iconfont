var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var del = require('del');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var template = require('gulp-template');
var service = require('gulp-koa');
var gulpRename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
const svgSymbols = require(`gulp-svg-symbols`);
const myIconJS = require('./assets/js/gulp-my-icons');

const projectName = 'paas-icons';
const projectPath = path.resolve(__dirname, `projects/${projectName}`)

/**
 * options for gulp-iconfont-css
 * 1. targetPath
 * The path where the (S)CSS file should be saved, relative to the path used in gulp.dest() (optional, 
 * defaults to _icons.css).
 * 2. path
 * The template path for (S)CSS
 */
gulp.task('iconfont', function() {
  return gulp.src([`${projectPath}/svg-font/*.svg`])
    .pipe(iconfontCss({
      fontName: projectName,
      path: 'assets/templates/_icons.scss.tpl',
      cssClass: projectName,
      targetPath: `../scss/${projectName}.scss`,
      fontPath: './',
      centerHorizontally: true
    }))
    .pipe(iconfont({
      fontName: projectName,
      fontHeight: 1001, //(>= 1000)
      normalize: true
    }))
    .pipe(gulp.dest('output/assets/fonts/'));
});

gulp.task('sass', ['iconfont'], function() {
  return gulp.src('./output/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./output/assets/fonts'));
});

gulp.task('svg-symbols', () => {
  gulp.src(`${projectPath}/svg-symbols/*.svg`).pipe(svgSymbols({
    slug: function(name) {
      return `${projectName}-${name}`
    },
  }))
  .pipe(myIconJS(`${projectName}.js`))
  .pipe(gulp.dest('output/assets/fonts'))
});

gulp.task('template', function() {
  gulp.src('assets/templates/index.html.tpl')
    .pipe(template({
      projectName,
      'svgFont': fs.readdirSync(`${projectPath}/svg-font/`).filter(name => {
        return name.endsWith('.svg');
      }).map(function(name) {
        return name.replace(/\.[^/.]+$/, '');
      }),
      'svgSymbols': fs.readdirSync(`${projectPath}/svg-symbols/`).filter(name => {
        return name.endsWith('.svg');
      }).map(function(name) {
        return name.replace(/\.[^/.]+$/, '');
      }),
    }))
    .pipe(gulpRename({
      basename: 'index',
      extname: '.html'
    }))
    .pipe(gulp.dest('output'));
});

gulp.task('clean', function() {
  return del.sync(['./output/*'], {
    force: true
  });
});

gulp.task('server', ['clean', 'sass', 'svg-symbols', 'template'], function() {
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
  gulp.watch([`${projectPath}/svg-font/*.svg`], ['sass', 'template']);
});