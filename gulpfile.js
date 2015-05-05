var gulp = require('gulp');

var watch = require('gulp-watch');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
    scripts: 'app/scripts/*.jsx',
    vendorStyles: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
    ]
};

gulp.task('js', function() {
    browserify('./app/app.jsx')
        .transform('reactify', { es6: true })
        .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp.src(paths.vendorStyles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([paths.scripts], ['js']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('default', ['js', 'css', 'connect', 'watch']);

