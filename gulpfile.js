var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.src([	'./js/base.js', 
			'./js/game/*.js',
			'./js/game/entities/baseplayer.js',
			'./js/game/scenes/**/*.js',

			'./js/game/entities/**/*.js',
			'./js/run.js'] ) //select all javascript files under js/ and any subdirectory
        .pipe(concat('codeTogether.js')) //the name of the resulting file
        .pipe(gulp.dest('min')) //the destination folder
       // .pipe(notify({ message: 'Finished minifying JavaScript'}));


