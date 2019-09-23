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

const stylesPath = 'assets/**/*.css';

gulp.task(
  'styles',
  () => gulp
    .src(stylesPath)
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/assets'))
);

gulp.task(
  'styles-watch',
  gulp.series(
    'styles',
    () => gulp.watch(
      stylesPath,
      gulp.series('styles')
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
