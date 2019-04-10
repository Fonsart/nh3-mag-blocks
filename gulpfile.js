const gulp = require('gulp');
const zip = require('gulp-zip');
const rename = require('gulp-rename');

const pluginName = 'nh3-mag-archive-image-block';

/**
 * 'zip' task function.
 *
 * Create a zip file that contains the plugin files in a directory named after the plugin.
 */
function makeZip() {
  return gulp
    .src([
      '*.php',
      '{js,js/**/*}',
      '{css,css/**/*}',
      'languages/**/{*.po~,*.pot~}',
    ])
    .pipe(rename((file) => file.dirname = `${pluginName}/${file.dirname}`))
    .pipe(zip(`${pluginName}.zip`))
    .pipe(gulp.dest('.'))
}

/**
 * 'css:build' task function.
 *
 * Currently only copy the css from the source forlder to the build folder.
 */
function copyCss() {
  return gulp
    .src('./src/css/**/*')
    .pipe(gulp.dest('./build/css/'))
}

/**
 * 'watch' task function.
 *
 * Watch for changes on the css source folder to trigger the copyCss function.
 */
function watch() {
  return gulp
    .watch('src/css/**/*', copyCss)
}

// Exports tasks to CLI
module.exports = {
  'css:build': copyCss,
  'zip': makeZip,
  watch
};
