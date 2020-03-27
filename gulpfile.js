const autoprefixer = require('autoprefixer');
const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');

const metalsmithBuild = require('./metalsmith.build');

gulp.task(
  'clean',
  () => del(['build'])
);

gulp.task(
  'metalsmith',
  async () => await metalsmithBuild()
);

gulp.task(
  'metalsmith-watch',
  gulp.series(
    'metalsmith',
    async () => await gulp.watch(
      ['src/**/*', 'layouts/**/*'],
      gulp.series('metalsmith')
    )
  )
);

const cssPath = 'assets/**/*.css';

gulp.task(
  'css',
  () => gulp
    .src(cssPath)
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/assets'))
);

gulp.task(
  'css-watch',
  gulp.series(
    'css',
    () => gulp.watch(
      cssPath,
      gulp.series('css')
    )
  )
);

const imagesPath = 'assets/**/*.{gif,jpg,png,svg}';

gulp.task(
  'images',
  () => gulp.src(imagesPath).pipe(gulp.dest('build/assets'))
);

gulp.task(
  'images-watch',
  gulp.series(
    'images',
    () => gulp.watch(
      imagesPath,
      gulp.series('images')
    )
  )
);

const jsPath = 'assets/**/*.js';

gulp.task(
  'js',
  () => gulp.src(jsPath).pipe(gulp.dest('build/assets'))
);

gulp.task(
  'js-watch',
  gulp.series(
    'js',
    () => gulp.watch(
      jsPath,
      gulp.series('js')
    )
  )
);
