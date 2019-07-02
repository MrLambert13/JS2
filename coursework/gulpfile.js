/**
 * For start develop type "npm run gulp start"
 * this command start JSONserver, browserSync, and will watch for change .json, .js, .sass, .html files.
 *
 */

//gulp
var gulp = require('gulp');
//gulp-sass
var sass = require('gulp-sass');
//browser-sync
var browserSync = require('browser-sync');
var browserPort = 8080;
var browserPortUI = 8081;
//gulp-json-server
var jsonServer = require('gulp-json-srv');
var server = jsonServer.create();
var pathDataJson = 'src/json/db.json';
//run-sequence
var runSequence = require('run-sequence');

//start json server with address http://localhost:3000
gulp.task('startJson', function () {
  //path to json file
  return gulp.src(pathDataJson)
  //start server
    .pipe(server.pipe());
});

//compile sass files
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/style'))
    .pipe(browserSync.reload({stream: true}));
});

//config for browser sync with URL: http://localhost:8080
gulp.task('browserSync', function () {
  browserSync({
    server: {
      //path to index.html
      baseDir: 'src',
    },
    ui: {
      port: browserPortUI
    },
    port: browserPort
  })
});

//start develop
gulp.task('start', function (callback) {
  runSequence([/*'startJson',*/ 'browserSync'],
    'watch',
    callback);
});

//watcher
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/script/**/*.js', browserSync.reload);
  // gulp.watch('src/json/**/*.json', ['startJson', browserSync.reload]);
});

