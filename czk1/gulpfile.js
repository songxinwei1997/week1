var gulp = require('gulp');
var server = require ('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var uglify = require('gulp-uglify');
var minCss = require('gulp-clean-css');
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
                res.end(JSON.stringify({code: 1}))
            } else {
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }  
        }
    }))
})