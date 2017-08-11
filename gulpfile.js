var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('sass', function() {
  return gulp.src('src/assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass', 'useref'], function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['useref']);
});
