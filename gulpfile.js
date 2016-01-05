/**
* by waynecz
*/
var gulp = require('gulp'),
	concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
	browserSync = require('browser-sync').create(),//引入模块
    reload = browserSync.reload,
	jsmin = require('gulp-uglify'),
    compass = require('gulp-compass'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('browser-sync', function() {//注册任务
    browserSync.init({//调用API
        server: {
            baseDir: ["./public/stylesheets", "**/*.html"] //监听当前路径
        }
    });
});

gulp.task('css', function() {//css合并压缩
    gulp.src(['public/stylesheets/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest("public/stylesheets"));
});

// scss编译css
gulp.task('sass', function() {
    return gulp.src("mySass/sass/*.scss")
        .pipe(compass({
          css: 'public/stylesheets',
          sass: 'source/sass'
        }))
});

gulp.task('browser-sync', function() {//注册任务
    browserSync.init({
    	files: "**",//监听整个项目
        proxy: 'localhost:3003'
    });
});

// gulp.task('js-min', function() {//js合并压缩
//     gulp.src('public/components/*.js')
//     	.pipe(concat('common.min.js'))
//     	.pipe(jsmin())
//     	.pipe(gulp.dest('public/javascripts'))
// });

// gulp.watch('js/*.js', ['js-min']);
gulp.watch('source/sass/*.scss', ['sass']);
gulp.watch('public/stylesheets/*.css', ['css']);
gulp.task('default', ["browser-sync", "css"])






