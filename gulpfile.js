/* File: gulpfile.js */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var strip_css_comments = require('gulp-strip-css-comments');
var useref = require('gulp-useref');
var gulp_ssh = require('gulp-ssh');

var config = JSON.parse(fs.readFileSync('./ssh_config.json','utf8'));

var ssh = new gulp_ssh({
  sshConfig: config
});

gulp.task('js', ['html'], function ()
{
  gulp.src('dist/main.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('scp', function()
{
  return gulp.src('app/**/*').pipe(ssh.dest('/home/rain/test'));
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
