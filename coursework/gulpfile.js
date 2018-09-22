var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');

//прогоняем sass файлы
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/style'))
    .pipe(browserSync.reload({string: true}));
});

//настройки сервера для browser sync
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
});

//watcher
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/script/**/*.js', browserSync.reload);
});

