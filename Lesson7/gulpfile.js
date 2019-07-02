/**
 * npm run gulp - запуск сайта, watch следит за изменением sass, js, html файлов
 * npm run gulp build - создание релизной версии сайта в папку dist
 * npm run gulp clean - удаление папки dist
 */

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  //подключаем плагин gulp-useref для объекдинения js
  useref = require('gulp-useref'),
  //подключаем gulp-uglify для минимизации
  uglify = require('gulp-uglify'),
  //подключаем gulp-if чтобы не минимифзировать css стили
  gulpIf = require('gulp-if'),
  //подключаем minify-css для минимизации css файлов
  minifyCSS = require('gulp-minify-css'),
  //подключаем плагин удаления файлов
  del = require('del'),
  //плагин для последовательного запуска задач
  runSequence = require('run-sequence');


//копирование jQuery в src
gulp.task('copyJQuery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('src/script'));
});

//Задача useref для сжатия и объединения js и css
gulp.task('useref', function () {

  return gulp.src('src/*.html')
    // Минифицируем только CSS файлы
    .pipe(gulpIf('*.css', minifyCSS()))
    // Если JS то запускаем uglify()
    .pipe(gulpIf('*.js', uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

//Clean для очистки дистрибутивных файлов
gulp.task('clean', function () {
  del('dist');
});

//подготовка сайта к релизу
gulp.task('build', function (callback) {
  runSequence('clean',
    ['sass', 'useref'],
    callback);
});

//Главная задача
gulp.task('default', function (callback) {
  runSequence(['sass', 'copyJQuery', 'browserSync', 'watch'],
    callback);
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/style'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/script/**/*.js', browserSync.reload);
});