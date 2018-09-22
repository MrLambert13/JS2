/**
 * For start develop type "npm run gulp start"
 */

//gulp
var gulp = require('gulp');
//gulp-sass
var sass = require('gulp-sass');
//browser-sync
var browserSync = require('browser-sync');
//gulp-json-server
var jsonServer = require('gulp-json-srv');
var server = jsonServer.create();
//run-sequence
var runSequence = require('run-sequence');

//start json server with address http://localhost:3000
gulp.task('startJson', function () {
  //path to json file
  return gulp.src('src/json/db.json')
  //start server
    .pipe(server.pipe());
});

//прогоняем sass файлы
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/style'))
    .pipe(browserSync.reload({stream: true}));
});

//настройки сервера для browser sync c адресом http://localhost:8080
gulp.task('browserSync', function () {
  browserSync({
    server: {
      //путь до файла index.html
      baseDir: 'src',
    },
    ui: {
      port: 8081
    },
    port: 8080
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
  gulp.watch('src/json/**/*.json', browserSync.reload);
});

