'use strict';

var fs = require('fs'),
	path = require('path'),
	del = require('del'),
	gulp = require('gulp'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	rollup = require('gulp-rollup'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	rollupBabel = require('rollup-plugin-babel'),
	rollupSourcemaps = require('rollup-plugin-sourcemaps');

global.G = {};

G.dirPath = {
	src: './src',
	css: './src/css',
	img: './src/img',
	js: './src/js',
	modules: './src/modules'
};

gulp.task('scripts', function () {
	return gulp.src(G.dirPath.modules + '/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(rollup({
			// intro: 'var chiQuery; (function() { "use strict";\r\n',
			// outro: '\r\n}());',
			entry: G.dirPath.modules + '/bundle.js',
			format: 'iife',
			indent: false,
			plugins: [
				rollupBabel({

					presets: 'es2015-rollup'
				}),
				rollupSourcemaps()
			]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(G.dirPath.js));
});

gulp.task('scripts:watch', function () {
	gulp.watch([G.dirPath.modules + '/**/*.js'], ['scripts']);
});

gulp.task('scripts:clean', function () {
	return del([G.dirPath.js + '/bundle.js', G.dirPath.js + '/bundle.js.map']);
});

gulp.task('clean', gulpsync.sync([
	'scripts:clean'
]));

gulp.task('connect', function () {
	connect.server({
		port: 1337,
		root: G.dirPath.src
	});
});

gulp.task('watch', gulpsync.sync([
	'scripts:watch'
]));

gulp.task('default', gulpsync.sync([
	'clean', 'scripts', ['connect', 'watch']
]));
