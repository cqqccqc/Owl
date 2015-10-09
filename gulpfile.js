// require gulp
var gulp = require('gulp');

// require component
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');

gulp.task('hint', function () {
	gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', function () {
	gulp.watch('src/*.js', function() {
		gulp.run('hint');
	});
});