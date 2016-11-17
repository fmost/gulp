var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps');

 
gulp.task('sass', () =>
    sass(['dev/scss/**/*.scss'], {
            style: 'compressed' //  'compact' 'compressed', 'expanded' //压缩css 方法1
            // sourcemap: false,
        })
        .on('error', sass.logError)
        // for inline sourcemaps 
        // .pipe(sourcemaps.write())
        // for file sourcemaps 
        // .pipe(sourcemaps.write('maps', {
        //     includeContent: false,
        //     sourceRoot: 'dist/css'
        // }))
        .pipe(gulp.dest('dist/css'))        
);

// 压缩css 方法2
// gulp.task('mincss', ['sass'], function () {
//     gulp.src('dist/**/*.css')
//         .pipe(cssmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('dist'))
// });


// 脚本
gulp.task('scripts', function() {  
  return gulp.src('dev/js/**/*.js')
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// 图片
gulp.task('images', function() {  
  return gulp.src('dev/images/**/*.{png,jpg,gif,svg}')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
});
// 数据图片
gulp.task('img', function() {  
  return gulp.src('dev/img/**/*.{png,jpg,gif,svg}')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
});

// clean
gulp.task('clean', function() {  
  return gulp.src(['js', 'css', 'images','img'], {read: false})
    .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {  
    gulp.start('sass', 'scripts', 'images','img');
});

// watch
gulp.task('watch', function() {
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/js/**/*.js', ['scripts']);
  gulp.watch('dev/images/**/*', ['images']);
  gulp.watch('dev/img/**/*', ['img']);
});