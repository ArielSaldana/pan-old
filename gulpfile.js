// require("babel-core").transform("code", options);

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    addsrc = require('gulp-add-src');


var options = {
    version: '',
    paths: {
        sources: '',
        destinationBabel: 'builds/babel/',
        destinationES6: 'builds/es6/'
    }
}

gulp.task('babel', () => {
    return gulp.src([
        'src/core/event_emitter.class.js',
        'src/tools/detector.class.js',
        'src/tools/keyboard.class.js',
        'src/tools/mouse.class.js',
        'src/tools/ticker.class.js',
        'src/tools/viewport.class.js',
        'src/pan.class.js'
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('pan' + '.js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(options.paths.destinationBabel));
});

gulp.task('es6', () => {
    return gulp.src([
        'src/core/event_emitter.class.js',
        'src/tools/detector.class.js',
        'src/tools/keyboard.class.js',
        'src/tools/mouse.class.js',
        'src/tools/ticker.class.js',
        'src/tools/viewport.class.js',
        'src/pan.class.js'
    ])
        .pipe(concat('pan' + '.js'))
        .pipe(gulp.dest(options.paths.destinationES6))
        .pipe(rename({ extname: '.min.js' }));
    // .pipe(uglify());
});


gulp.task('default', ['babel', 'es6']);