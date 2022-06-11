const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


// Sass task
function scssTask(){
    return src('scss/main.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('css', { sourcemaps: '.'}));
}
// Browsersync tasks
function browsersyncServer(cb){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    })
    cb();
}
function browsersyncReload(cb){
    browsersync.reload();
    cb();
}
//Watch task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['scss/**/*.scss'], series(scssTask, browsersyncReload));
}

//default gulp task

exports.default = series(
    scssTask,
    browsersyncServer,
    watchTask
)

