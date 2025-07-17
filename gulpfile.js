const gulp = require('gulp')
const minifycss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const cssnano = require('gulp-cssnano')
const htmlclean = require('gulp-htmlclean')
const del = require('del')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const connect = require('gulp-connect')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))

const config = require('./config.json')
const docs = require('./src/docs.json')

const pugData = { ...config, docs: docs };

gulp.task('clean', () => {
	return del(['./dist/*'])
})

gulp.task('css', () => {
	return gulp
		.src(['./src/css/*.scss', './src/css/doc/doc.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(minifycss({ compatibility: 'ie8' }))
		.pipe(autoprefixer({ browsers: ['last 2 version'] }))
		.pipe(cssnano({ reduceIdents: false }))
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('html', () => {
	return gulp
		.src('./dist/index.html')
		.pipe(htmlclean())
		.pipe(htmlmin())
		.pipe(gulp.dest('./dist'))
})

gulp.task('js', () => {
	return gulp
		.src('./src/js/*.js')
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
})

gulp.task('pug', () => {
	return gulp
		.src('./src/index.pug')
		.pipe(pug({ data: pugData }))
		.pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
	return gulp
		.src(['./src/assets/**/*'])
		.pipe(gulp.dest('./dist/assets'));
})

gulp.task('layout', () => {
	return gulp
		.src('./src/layout/*.pug') // 只编译 layout 目录下的 pug 文件
		.pipe(pug({ data: pugData }))
		.pipe(gulp.dest('./dist/layout'))
})

gulp.task('copy-blog', () => {
	return gulp
		.src('./blog/public/**/*') // Hexo 生成的静态文件
		.pipe(gulp.dest('./dist/blog/')); // 目标路径
});


gulp.task('build', gulp.series('clean', 'assets', 'pug', 'layout', 'css', 'js', 'html', 'copy-blog'));
gulp.task('default', gulp.series('build'))

gulp.task('watch', () => {
	gulp.watch('./src/components/*.pug', gulp.parallel('pug'))
	gulp.watch('./src/index.pug', gulp.parallel('pug'))
	gulp.watch('./src/css/**/*.scss', gulp.parallel(['css']))
	gulp.watch('./src/js/*.js', gulp.parallel(['js']))
	connect.server({
		root: 'dist',
		livereload: true,
		port: 8080
	})
})
