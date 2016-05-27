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
var del = require('del');
var config;

gulp.task('js', ['html'], function ()
{
  return gulp.src('dist/main.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

try
{
  config = JSON.parse(fs.readFileSync('.sshrc','utf8'));

  var ssh = new gulp_ssh({
    sshConfig: config
  });

  gulp.task('setup_server_folder', ['js'], function()
  {
    return gulp.src(['./**/*', './.*', '!app/**/*', '!**/node_modules/**/*', '!dist/**/*', '!logs/**/*', '!ssh_config.json'])
      .pipe(ssh.dest('/home/rain/tmp'));
  });

  gulp.task('deploy_assets', ['setup_server_folder'], function()
  {
    return gulp.src('app/assets/**/*')
      .pipe(ssh.dest('/home/rain/tmp/app/assets'));
  });

  gulp.task('deploy_css', ['deploy_assets'], function()
  {
    return gulp.src(['app/styles/**/*'])
    .pipe(ssh.dest('/home/rain/tmp/app/styles'));
  });

  gulp.task('deploy_js', ['deploy_css'], function()
  {
    return gulp.src(['app/scripts/directives/**/*'])
    .pipe(ssh.dest('/home/rain/tmp/app/scripts/directives'));
  });

  gulp.task('deploy_minified_files', ['deploy_js'], function()
  {
    return gulp.src(['app/favicon.ico', 'app/robots.txt', 'dist/index.html', 'dist/main.min.js'])
      .pipe(ssh.dest('/home/rain/tmp/app'));
  });

  gulp.task('server_package_manager', ['deploy_minified_files'], function()
  {
    return ssh.shell(['cd tmp', 'npm install', 'bower install']);
  });

  gulp.task('server_setup', ['server_package_manager'], function()
  {
     return ssh.shell(['cd', 'mv website old', 'mv tmp website', 'rm -rf old'], {filePath: 'setup.log'})
      .pipe(gulp.dest('logs'));
  });

  gulp.task('clean_dist', ['server_setup'],function()
  {
    return del(['dist']);
  });

  gulp.task('deploy', ['clean_dist']);
}
catch (e)
{
  console.log('ssh private key not found or not valid.');
}

gulp.task('html', function()
{
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function()
{
  browserSync.init({
       server: './app'
   });

  gulp.watch('app/*.html').on('change', browserSync.reload);

  gulp.watch('app/scripts/**/*.js').on('change', browserSync.reload);
});

gulp.task('test', function()
{
  
});

gulp.task('css', function()
{
  return gulp.src([
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
