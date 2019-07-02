/**
 * For start develop type "npm run gulp start"
 * this command start JSONserver, browserSync, and will watch for change .json, .js, .sass, .html files.
 *
 */

//gulp
var gulp = require('gulp'),
    //подключаем плагин gulp-useref для объекдинения js
    useref = require('gulp-useref'),
    //подключаем gulp-uglify для минимизации
    uglify = require('gulp-uglify'),
    //подключаем gulp-if чтобы не минимифзировать css стили
    gulpIf = require('gulp-if'),
    //подключаем minify-css для минимизации css файлов
    minifyCSS = require('gulp-minify-css'),
    //подключаем плагин удаления файлов
    del = require('del');
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
    return gulp.src('src/sass/**/*.sass', { allowEmpty: true })
        .pipe(sass())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({stream: true}));
});

//Clean для очистки дистрибутивных файлов
gulp.task('clean', function () {
    del('dist');
});
//Задача useref для сжатия и объединения js и css
gulp.task('useref', function () {

    return gulp.src('src/*.html' )
    // Минифицируем только CSS файлы
        .pipe(gulpIf('*.css', minifyCSS()))
        // Если JS то запускаем uglify()
        .pipe(gulpIf('*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});
//подготовка сайта к релизу
gulp.task('build', function (callback) {
    runSequence('clean',
        ['sass', 'useref'],
        callback);
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

