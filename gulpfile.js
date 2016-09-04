var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function(){
  return gulp.src('src/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('copytemplates', function() {
  return gulp.src('src/templates/*')
  .pipe(gulp.dest('dist/templates'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  console.log('Building files');
  runSequence('clean:dist',
    'sass',
    ['useref','copytemplates'],
    callback
  )
});
