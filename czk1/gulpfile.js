var gulp = require('gulp');
var server = require ('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var uglify = require('gulp-uglify');
var minCss = require('gulp-clean-css');
var list = require('./data/list.json');
var babel = require ('gulp-babel');
var minHtml = require('gulp-htmlmin');
gulp.task('server', function () {
    gulp.src('src')
    .pipe(server({
        port:9090,
        middleware: function (req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico') {
                return false;
            }

            if (pathname == '/api/list') {
                res.end(JSON.stringify({code: 0, data: list}));
            } else {
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }  
        }
    }))
});

gulp.task('uglify', function () {
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./bulid/js'))
});
gulp.task('minCss', function () {
    gulp.src('./src/scss/*.scss')
    .pipe(minCss())
    .pipe(gulp.dest('./bulid/css'))
});
var options = {
    collapseWhitespace:true
}
gulp.task('minHtml', function () {
    gulp.src('./src/**/*.html')
    .pipe(minHtml(options))
    .pipe(gulp.dest('bulid'))
})