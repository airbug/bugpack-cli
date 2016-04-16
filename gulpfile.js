/*
 * Copyright (c) 2015 airbug Inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var jest        = require('gulp-jest');
var gulpUtil    = require('gulp-util');


//-------------------------------------------------------------------------------
// Gulp Tasks
//-------------------------------------------------------------------------------

gulp.task('default', function() {
    return gulp.src(['libraries/bugcore/js/**/*.js','!node_modules/**']);
});

gulp.task('lint', function () {
    return gulp.src([
        'libraries/bugcore/js/**/*.js',
        '!node_modules/**'
    ])
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError())
        .on('error', function(error) {
            gulpUtil.log('Stream Exiting With Error');
        });
});

gulp.task('lint-watch', function() {
    var lintAndPrint = eslint();
    lintAndPrint.pipe(eslint.formatEach());
    return gulp.watch('libraries/bugpack-api/js/**/*.js', function(event) {
        if (event.type !== 'deleted') {
            gulp.src(event.path)
                .pipe(lintAndPrint, {end: false});
        }
    });
});

gulp.task('test', function () {
    return gulp.src('libraries/bugpack-api/js').pipe(jest({
        unmockedModulePathPatterns: [

        ],
        testDirectoryName: 'test',
        testFileExtensions: [
            'js'
        ],
        testPathIgnorePatterns: [
            'node_modules'
        ],
        moduleFileExtensions: [
            'js'
        ]
    }));
});

