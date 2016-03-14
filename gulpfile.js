/* File: gulpfile.js */
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var strip_css_comments = require('gulp-strip-css-comments');
var useref = require('gulp-useref');

gulp.task('js', ['html'], function ()
{
  gulp.src([
    'app/bower_components/jQuery/dist/jquery.min.js',
    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'app/bower_components/flexslider/jquery.flexslider-min.js',
    'app/bower_components/lightbox2/dist/js/lightbox.min.js',
    'app/bower_components/masonry/dist/masonry.pkgd.min.js',
    'app/bower_components/angular/angular.min.js',
    'app/scripts/ui/flickr.js',
    'app/scripts/ui/twitterfetcher.min.js',
    'app/scripts/ui/spectragram.min.js',
    'app/scripts/ui/ytplayer.min.js',
    'app/scripts/ui/countdown.min.js',
    'app/scripts/app.js',
    'app/scripts/controllers.js',
    'app/scripts/directives.js',
    'app/scripts/ui/services.js',
    'app/scripts/ui/smooth-scroll.min.js',
    'app/scripts/ui/parallax.js',
    'app/scripts/ui/scripts.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function()
{
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['js']);

gulp.task('serve', function()
{
  browserSync.init({
       server: './app'
   });

  gulp.watch('app/*.html').on('change', browserSync.reload);

  gulp.watch('app/scripts/**/*.js').on('change', browserSync.reload);
});

gulp.task('css', function()
{
  gulp.src([
    'app/styles/css/bootstrap.css',
    'app/styles/css/themify-icons.css',
    'app/styles/css/flexslider.css',
    'app/styles/css/lightbox.min.css',
    'app/styles/css/ytplayer.css',
    'app/styles/css/theme.css',
    'app/styles/css/custom.css'
  ]).pipe(strip_css_comments())
  .pipe(sourcemaps.init())
  .pipe(minifyCss())
  .pipe(concat('style.min.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/styles/css/'))
  .pipe(browserSync.stream());
});


gulp.task('default', ['serve'], function()
{
});
