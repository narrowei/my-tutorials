var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
//start express
gulp.task("node", function() {
    nodemon({
        script: 'app.js',
        ignore : [
            //ignore some files to boost up the performance
            "static/"
        ],
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('serve', ["node"], function() {
    var files = [
        "app.js",
    ];
    browserSync.init({
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 3001
    });

    gulp.watch(files).on("change", reload);
});

