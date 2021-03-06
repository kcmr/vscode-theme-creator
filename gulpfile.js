'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pixels-to-rem');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const {browserslist} = require('./package');
const argv = require('yargs').argv;

const ENV = (argv.pro === undefined) ? 'development' : 'production';
const PORT = 5000;

const files = {
  src: {
    styles: 'scss/**/*.scss',
    watch: ['**/*.handlebars', '**/*.js']
  },
  dest: {
    styles: 'static/styles'
  }
};

const pxtoremConfig = {
  exclude: [
    'border', 
    'box-shadow', 
    'border-radius'
  ]
};

gulp.task('styles', () => {
  return gulp.src(files.src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([ 
      pxtorem(pxtoremConfig),
      autoprefixer({ 
        browsers: browserslist[ENV] 
      }) 
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(files.dest.styles))
    .pipe(browsersync.reload({
      stream: true
    }));
});

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', () => {
    if (!started) {
      started = true;
      cb();
    }
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browsersync({
    proxy: `http://localhost:${PORT}`,
    open: false,
    notify: false,
    ghostMode: false
  });
});

gulp.task('default', ['browser-sync', 'styles'], () => {
  gulp.watch(files.src.styles, ['styles']);
  gulp.watch(files.src.watch, browsersync.reload);
});