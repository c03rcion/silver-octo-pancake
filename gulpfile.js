var gulp = require('gulp');
var bs = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');

gulp.task('browser-sync', function(){
  bs.init({
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task('nunjucks', function(){
  return gulp.src('dev/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['dev/templates/']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.reload({stream:true}));
});

gulp.task('sass', function(){
  return gulp.src('dev/src/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/build/stylesheets'))
    .pipe(bs.reload({stream:true}));
})

gulp.watch('dev/src/stylesheets/*.scss', ['sass']);
gulp.watch('dev/pages/*.nunjucks', ['nunjucks']);
gulp.watch('dev/templates/*.nunjucks', ['nunjucks']);
gulp.watch('dev/templates/partials/*.nunjucks', ['nunjucks']);
gulp.watch('*.html').on('change', bs.reload);
