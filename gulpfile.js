const {series, src, dest, watch, paralell} = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

const paths = {
    imgSrc: "./src/img/**/*",
    imgDest: "./build/img",
    jsSrc: "./src/js/**/*.js",
    jsDest: "./build/js",
    cssSrc: "./src/scss/app.scss",
    cssDest: "./build/css",
    watchCssSrc: "./src/scss/**/*.scss", 
};

function css(){
    return src(paths.cssSrc)
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(dest(paths.cssDest));
}

function js(){
    return src(paths.jsSrc)
        .pipe(concat("bundle.js"))
        .pipe(dest(paths.jsDest));
}

function image(){
    return src(paths.imgSrc)
        .pipe(webp())
        .pipe(dest(paths.imgDest))
        .pipe(imagemin())
        .pipe(dest(paths.imgDest));
}

function watchFiles(){
    watch(paths.watchCssSrc, css);
    watch(paths.jsSrc, js);
}


exports.imageOpt = image;
exports.default = series(css, js, watchFiles);