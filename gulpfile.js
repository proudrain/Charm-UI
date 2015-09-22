var gulp = require('gulp');
var colors = require('colors');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-ng-html2js': 'ngHtml2js',
    'gulp-minify-css': 'minifyCss'
  }
});

var conf = {
  filename: 'Charm-UI',
  srcSassPath: './src/*/*.scss',
  srcJsPath: './src/*/*.jsx',
  distPath: './dist',
  serverPath: './',
};

gulp.task('sass', function () {
  return gulp.src(conf.srcSassPath)
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe($.concat(conf.filename + '.css'))
    .pipe(gulp.dest(conf.distPath))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe($.rename({extname: '.min.css'}))
    .pipe(gulp.dest(conf.distPath));
});

gulp.task('jsx', function () {
  return gulp.src(conf.srcJsPath)
    .pipe($.jshint())
    .pipe($.sourcemaps.init())
    .pipe($.react())
    .pipe($.concat(conf.filename + '.js'))
    .pipe(gulp.dest(conf.distPath))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe($.rename({extname: '.min.js'}))
    .pipe(gulp.dest(conf.distPath));
});

gulp.task('release', ['sass', 'jsx'], function () {
  console.log('Release completed!'.green);
});

gulp.task('default', ['release'], function () {
  console.log('Watching...'.cyan);
});

var log = function(event) {
  console.log('File '.cyan + colors.cyan.underline(event.path) + ' was '.cyan + colors.cyan.bold(event.type) +
    ', running tasks...'.cyan);
};
var jsWatcher = gulp.watch([conf.srcJsPath], ['jsx']);
var sassWatcher = gulp.watch([conf.srcSassPath], ['sass']);
jsWatcher.on('change', log);
sassWatcher.on('change', log);
