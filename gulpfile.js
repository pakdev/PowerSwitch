var gulp = require('gulp');

var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var autoprefixer = require('autoprefixer-core');

var through = require('through2');
var coffeeify = require('coffeeify');
var browserify = require('browserify');


var paths = {
    ASSETS: [
        'app/assets/**/*'
    ],
    SCRIPT: 'app/scripts/app.coffee',
    SCRIPTS: [
        'app/scripts/**/*.coffee',
    ],
    STYLES: [
        'app/styles/*.scss'
    ],
    VENDOR_SCRIPTS: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-pretty-checkable/dist/angular-pretty-checkable.min.js',
        'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
        'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js'
    ],
    VENDOR_STYLES: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/angular-pretty-checkable/dist/pretty-checkable.css'
    ]
};

gulp.task('assets', function() {
    gulp.src(paths.ASSETS, {base: 'app/assets'})
        .pipe(gulp.dest('public'))
        .pipe(livereload());
        //.pipe(connect.reload());
});

gulp.task('scripts', function() {
    var browserified = function() {
        return through.obj(function(chunk, enc, callback) {
            if (chunk.isBuffer()) {
                var b = browserify(chunk.path).transform(coffeeify);
                chunk.contents = b.bundle();
                this.push(chunk);
            }

            callback();
        });
    };

    gulp.src(paths.SCRIPT)
        .pipe(browserified())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public/js')),
    gulp.src(paths.VENDOR_SCRIPTS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(livereload());
        //.pipe(connect.reload());
});

gulp.task('styles', function() {
    gulp.src(paths.STYLES)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(postcss([autoprefixer({ browsers: ['last 1 version' ] })]))
        .pipe(gulp.dest('public/css')),
    gulp.src(paths.VENDOR_STYLES)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
        //.pipe(connect.reload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.ASSETS, ['assets']);
    gulp.watch(paths.SCRIPTS, ['scripts']);
    gulp.watch(paths.STYLES, ['styles']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('default', ['assets', 'scripts', 'styles', 'watch']);
gulp.task('serve', ['assets', 'scripts', 'styles', 'watch', 'connect']);

