const autoprefixer = require('autoprefixer')
const del = require('del')
const gulp = require('gulp')
const inline = require('gulp-inline-source')
const postcss = require('gulp-postcss')

const metalsmithBuild = require('./metalsmith.build')

gulp.task(
  'clean',
  () => del(['build'])
)

gulp.task(
  'metalsmith',
  () => metalsmithBuild()
)

gulp.task(
  'metalsmith-watch',
  ['metalsmith'],
  () => gulp.watch(['src/**/*', 'layouts/**/*'], ['metalsmith'])
)

const stylesPath = 'assets/**/*.css'

gulp.task(
  'styles',
  () => gulp
    .src(stylesPath)
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest('build/assets'))
)

gulp.task(
  'styles-watch',
  ['styles'],
  () => gulp.watch(stylesPath, ['styles'])
)

const imagesPath = 'assets/**/*.{gif,jpg,png,svg}'

gulp.task(
  'images',
  () => gulp.src(imagesPath).pipe(gulp.dest('build/assets'))
)

gulp.task(
  'images-watch',
  ['images'],
  () => gulp.watch(imagesPath, ['images'])
)

gulp.task(
  'inline',
  () => gulp.src('build/**/*.html').pipe(inline({
    rootpath: 'build'
  })).pipe(gulp.dest('build'))
)
