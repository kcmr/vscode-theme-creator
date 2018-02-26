'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const {browserslist} = require('./package');
const argv = require('yargs').argv;

const ENV = (argv.pro === undefined) ? 'development' : 'production';

const files = {
  src: {
    styles: 'scss/**/*.scss',
    watch: ['*.html']
  },
  dest: {
    styles: 'styles'
  }
};

gulp.task('styles', () => {
  return gulp.src(files.src.styles)
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: browserslist[ENV] }) ]))
    .pipe(gulp.dest(files.dest.styles))
    .pipe(browsersync.reload({
      stream: true
    }));
});

gulp.task('server', () => {
  browsersync({
    server: {
      baseDir: './'
    },
    open: false,
    notify: false,
    ghostMode: false
  });
});

gulp.task('default', ['server', 'styles'], () => {
  gulp.watch(files.src.styles, ['styles']);
  gulp.watch(files.src.watch, browsersync.reload);
});