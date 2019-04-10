const gulp = require('gulp');
const zip = require('gulp-zip');
const rename = require('gulp-rename');

const pluginName = 'nh3-mag-archive-image-block';

gulp.task('zip', () =>
  gulp.src([
    '*.php',
    '{js,js/**/*}',
    '{css,css/**/*}',
    'languages/**/{*.po~,*.pot~}',
  ])
    .pipe(rename((file) => file.dirname = `${pluginName}/${file.dirname}`))
    .pipe(zip(`${pluginName}.zip`))
    .pipe(gulp.dest('.'))
)
