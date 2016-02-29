/* File: gulpfile.js */

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;

gulp.task('bower', function ()
{
  console.log('launching bower task...');
  gulp.src('app/index.html').pipe(wiredep()).pipe(gulp.dest('app'));
});

gulp.task('sass', function()
{
  gulp.src('app/styles/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(minifyCss())
  .pipe(sourcemaps.write())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/styles/css/'))
  .pipe(browserSync.stream());
});

gulp.task('js', function ()
{
  return gulp.src('js/*js').pipe(uglify()).pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('serve', function()
{
  browserSync.init({
       server: "./app"
   });

  gulp.watch("app/styles/sass/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);

  gulp.watch("app/scripts/*.js", ['js-watch']);

});

gulp.task('default', ['serve'], function()
{
});
