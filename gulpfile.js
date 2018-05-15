const del = require('del')
const gulp = require('gulp')
const inline = require('gulp-inline-source')
const metalsmithBuild = require('./metalsmith.build')

gulp.task('clean', () => del(['./build']))

gulp.task('metalsmith', () => metalsmithBuild())

gulp.task('metalsmith-watch', ['metalsmith'], () => {
  gulp.watch(['./src/**/*', '!./src/assets/'], ['metalsmith'])
})

gulp.task('stylesheets', () => {
  return gulp.src('./src/assets/**/*.css').pipe(gulp.dest('./build/assets'))
})

gulp.task('stylesheets-watch', ['stylesheets'], () => {
  gulp.watch('./src/assets/**/*.css', ['stylesheets'])
})

gulp.task('inline', () => {
  return gulp.src('./build/**/*.html').pipe(inline({
    rootpath: './src'
  })).pipe(gulp.dest('./build'))
})
