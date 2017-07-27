const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('copy', () => {
  return new Promise((resolve, reject) => {
    gulp.src('src/**/*.json')
      .pipe(gulp.dest('dist'))
      .on('error', reject)
      .on('end', resolve);
  });
});

gulp.task('build', ['copy'], () => {
  console.log("Building server...");

  return new Promise((resolve, reject) => {
    gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['latest'],
      plugins: ['transform-runtime', 'transform-class-properties', 'transform-decorators-legacy', 'transform-async-to-generator', 'syntax-async-functions', 'transform-async-to-module-method']
    }))
    .on('error', reject)
    .pipe(sourcemaps.write('.'))
    .on('error', reject)
    .pipe(gulp.dest('dist'))
    .on('error', reject)
    .on('end', resolve);
  });
});

// define tasks here
gulp.task('default', ['build'], function(){

});