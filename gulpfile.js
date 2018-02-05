var fs = require('fs');

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var server = require('gulp-express');
var template = require('gulp-template');

var fontName = 'my-icons';

gulp.task('iconfont', function () {
	gulp.src(['app/assets/icons/*.svg'])
	.pipe(iconfontCss({
		fontName: fontName,
		path: 'app/assets/scss/templates/_icons.scss',
		cssClass: 'my-icon',
		targetPath: '../../scss/_icons.scss',
		fontPath: '../fonts/icons/',
		centerHorizontally: true
	}))
	.pipe(iconfont({
		fontName: fontName,
		fontHeight: 1001, //(>= 1000)
		normalize: true
	}))
	.pipe(gulp.dest('app/assets/fonts/icons/'));
});

gulp.task('sass', ['iconfont'], function () {
	return gulp.src('./app/assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./app/assets/css'));
});

gulp.task('server', ['sass', 'template'], function () {
	server.run(['app.js']);
	gulp.watch(['app/**/*.html'], server.notify);
	gulp.watch(['app/assets/**/*.scss'], ['sass', 'template']);
	gulp.watch(['app/assets/**/*.html'], ['sass', 'template']);
	gulp.watch(['app/assets/**/*.svg'], ['sass', 'template']);
});

gulp.task('template', function () {
	gulp.src('app/assets/template/index.html')
	.pipe(template({
		'icons': fs.readdirSync('./app/assets/icons/').map(function (name) {
			return name.replace(/\.[^/.]+$/, '');
		})
	}))
	.pipe(gulp.dest('app'));
});
