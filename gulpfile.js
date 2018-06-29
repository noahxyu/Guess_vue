var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  sourcemaps = require('gulp-sourcemaps');

var path = {
  sass: './src/style/**/*.scss',
  js: './src/js/*.js',
  html: './src/*.html'
}



gulp.task('browser-sync', function(){
  browserSync.init({
    port:'61620',
    server:{
      baseDir:'./'
    }
  });
});




// Styles
gulp.task('sass', function(){
  return gulp.src(path.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});



// Script
gulp.task('js', function(){
  return gulp.src(path.js)
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
})



//Build
gulp.task('build', function(){
  gulp.src(path.sass)
    .pipe(gulp.dest('./dist/css/'));
  gulp.src(path.js)
    .pipe(gulp.dest('./dist/js/'));
});



// Watch
gulp.task('watch', function(){
  gulp.watch(path.html, ['html'])
  gulp.watch(path.sass, ['sass'])
  gulp.watch(path.js, ['js'])
});



// Static server
gulp.task('serve',['browser-sync','watch']);




// Start build server
gulp.task('serve:dist', ['build'], function(){
  browserSync.init({
    server: {
      baseDir:'./'
    }
  });
});
