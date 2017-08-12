const gulp        = require('gulp');
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');

gulp.task('build', function () {
    return browserify({entries: './assets/src/js/visualise.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('visualise.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./web/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./assets/src/js/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
