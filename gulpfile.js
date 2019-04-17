const gulp = require('gulp');
const zip = require('gulp-zip');
const rename = require('gulp-rename');
const browsersync = require('browser-sync');

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
      '{templates,templates/**/*}'
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
 * Watch for changes on the css source folder to trigger the copyCss function.
 */
function watchCss() {
  return gulp.watch('src/css/**/*', copyCss);
}

/**
 * Watches for changes on the build folder to trigger a browser reload.
 */
function watchBuild() {
  return gulp.watch('build/**/*', reloadBrowser);
}

/**
 * Promise wrapper around the BrowserSync reload() method.
 */
function reloadBrowser() {
  return Promise.resolve(browsersync.reload());
}

/**
 * 'sync' task function.
 *
 * Launch a BrowserSync instance, proying the actual localhost backend.
 */
function syncBrowser() {
  return browsersync.init({
    proxy: 'http://localhost/nh3-wp'
  });
}

// Groups all watch function.
const watch = gulp.parallel(watchCss, watchBuild);

// Starts a browser sync instance and watches for changes.
const defaultTask = gulp.parallel(syncBrowser, watch);

// Exports tasks to CLI
module.exports = {
  default: defaultTask,
  'css:build': copyCss,
  'sync': syncBrowser,
  'watch': watch,
  'zip': makeZip,
};
