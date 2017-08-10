var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
// var buffer      = require('vinyl-buffer');
// var uglify      = require('gulp-uglify');

gulp.task('build', function () {
    return browserify({entries: './assets/src/js/visualise.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('visualise.min.js'))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./web/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./assets/src/js/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
