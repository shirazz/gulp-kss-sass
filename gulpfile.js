var paths = {
	styles: {
		src	 	 : "./scss",
		dest 	 : "./css",
		files 	 : "/**/*.scss",
		mainfile : "/main.scss"
	},
	styleguides: {
		dest 	 : "./styleguide/",
		files 	 : "/**/*",
		overview : "/styleguide.md"
	},
	template: {
		src		 : "./template",
		files 	 : "/**/*"
	}
}

// Plugins used
var gulp 			= require('gulp'), 
	autoprefixer 	= require('gulp-autoprefixer'), 
	clean 			= require('gulp-clean'), 
	concat 			= require('gulp-concat'), 
	livereload 		= require('gulp-livereload'), 
	rename 			= require('gulp-rename'), 
	sass 			= require('gulp-sass'), 
	size 			= require('gulp-size'), 
	kss 			= require('gulp-kss'), 
	util 			= require('gulp-util');

// kss task
gulp.task('kss', function(){
	gulp.src(paths.styles.src + paths.styles.files)
	.pipe(kss({
		overview: paths.styles.src + paths.styleguides.overview,
		templateDirectory: paths.template.src
	}))
	.pipe(gulp.dest(paths.styleguides.dest))
})

// Sass task
gulp.task('sass', function(){
	return gulp.src(paths.styles.src + paths.styles.files)
		   .pipe(sass({
		   		outputStyle: 'compressed',
		   		includePaths: [paths.styles.src]
		   }))
		   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		   .pipe(size())
		   // .pipe(rename(pkg.name + '.min.css'))
		   .pipe(rename('style.min.css'))
		   .pipe(gulp.dest(paths.styles.dest))
		   .pipe(rename('style.css'))
		   .pipe(gulp.dest(paths.styleguides.dest + '/public'))
		   .pipe(livereload());
})

// Clean task
gulp.task('clean', function(){
	return gulp.src([paths.styles.dest,  paths.styleguides.dest], {read: false})
		   .pipe(clean());
})

// Styleguide task
gulp.task('styleguide', ['clean'], function(){
	gulp.start('kss', 'sass');
})

// Watch the style guide
gulp.task('watchguide', function() { 
 	gulp.watch([paths.styles.src + paths.template.files,  paths.template.src + paths.template.files], ['styleguide']);
});

// default task // should change
gulp.task('default', ['clean'], function(){
	gulp.start('kss', 'sass');
})