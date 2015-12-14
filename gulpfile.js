/**
* by waynecz
*/
var gulp = require('gulp'),
	concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
	browserSync = require('browser-sync').create(),//引入模块
	jsmin = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('browser-sync', function() {//注册任务
    browserSync.init({//调用API
        server: {
            baseDir: "./" //监听当前路径
        }
    });
});

gulp.task('css-min', function() {//css合并压缩
    gulp.src(['css/*.css', 'public/components/reset.css'])
    	.pipe(concat('common.min.css'))
    	.pipe(cssmin())
    	.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('browser-sync', function() {//注册任务
    browserSync.init({
    	files: "**",//监听整个项目
        proxy: 'localhost:3003'
    });
});

gulp.task('js-min', function() {//js合并压缩
    gulp.src('public/components/*.js')
    	.pipe(concat('common.min.js'))
    	.pipe(jsmin())
    	.pipe(gulp.dest('public/javascripts'))
});

gulp.watch('js/*.js', ['js-min']);
gulp.watch('css/*.css', ['css-min']);
gulp.task('default', ["browser-sync", 'css-min', 'js-min'])






