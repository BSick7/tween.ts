var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var typescript = require('gulp-typescript');

var metadata = require('./package');
var header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';

gulp.task('lint', function() {
	return gulp.src('build/Tween.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('min', function() {
	return gulp.src([
		'build/Tween.js'
	])
	.pipe(uglify())
	.pipe(insert.prepend(header))
	.pipe(rename('tween.min.js'))
	.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch('src/*.ts', ['build', 'lint', 'min']);
});

gulp.task('build', function () {
    return gulp.src('src/Tween.ts')
    .pipe(typescript())
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['build', 'lint', 'min', 'watch']);
