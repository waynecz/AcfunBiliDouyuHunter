/**
 * by waynecz
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    csscomb = require('gulp-csscomb'),
    browserSync = require('browser-sync').create(), //引入模块
    jsmin = require('gulp-uglify'),
    rename = require('gulp-rename');
var postcss = require("gulp-postcss");
var autoprefixer = require('autoprefixer');// css前缀
var postcssSimpleVars = require("postcss-simple-vars");
var postcssMixins = require("postcss-mixins");// 定义变量
var postcssNested = require("postcss-nested");// 允许css内嵌
var sourcemaps = require("gulp-sourcemaps");

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./" //基本目录，这里相当于根目录
        }
    });
    
});

gulp.task('serve', function(){
    browserSync.init({
        files: ["public/stylesheets/**", "public/partials/*.html", "public/javascripts/app.js"],// 监听文件的路径
        proxy: 'localhost:3003'
    })
})

// Css process.
gulp.task("postcss", function(){
    var processors = [
        postcssMixins,
        postcssSimpleVars,
        postcssNested,
        autoprefixer({
            browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]
        })];

    return gulp.src(["source/css/*.css"])
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write("."))
        .pipe(csscomb())// 这里对css属性排序，学习用，后面考虑替换为压缩
        .pipe(gulp.dest("public/stylesheets"));
});

gulp.watch('source/css/*.css', ['postcss']);
gulp.task('default', ["serve"])










