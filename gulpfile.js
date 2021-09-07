const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

const buildCSS = () => {
    return src('src/scss/ice-cookies.scss')
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(dest('dist/ice-cookies/'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dist/ice-cookies/'))
}

const buildJS = () => {
    return src('src/ts/ice-cookies.ts')
        .pipe(plumber())
        .pipe(tsProject())
        .pipe(dest('dist/ice-cookies/'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('dist/ice-cookies/'))
}

exports.default = series(buildCSS, buildJS)