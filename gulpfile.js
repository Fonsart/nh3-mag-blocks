const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const browsersync = require('browser-sync');
const zip = require('gulp-vinyl-zip').zip;
const sass = require('gulp-sass');
const wpPot = require('gulp-wp-pot');
const package = require('./package.json');

sass.compiler = require('node-sass');

const pluginName = 'nh3-mag-blocks';
const zipPath = [
  '*.php',
  'build/**/*',
  'classes/**/*',
  'languages/**/{*.po~,*.pot~}',
  'templates/**/*'
];
const potFiles = [
  'classes/**/*.php',
  'templates/**/*.php',
  '*.php'
]

/**
 * 'zip' task function.
 *
 * Create a zip file that contains the plugin files in a directory named after the plugin.
 */
function makeZip() {
  return gulp
    .src(zipPath, { base: '.' })
    .pipe(rename((file) => file.dirname = `${pluginName}/${file.dirname}`))
    .pipe(zip(`${pluginName}.zip`))
    .pipe(gulp.dest('.'))
}

/**
 * Currently only copy the css from the source forlder to the build folder.
 */
function buildCss() {
  return gulp
    .src('./src/css/editor.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'))
}

/**
 * Build the POT file by parsing the php source files
 */
function buildPot() {
  return gulp
    .src(potFiles)
    .pipe(wpPot({
      domain: package.wp.textDomain,
      package: package.wp.pluginName
    }))
    .pipe(gulp.dest(`./languages/${package.wp.textDomain}.pot`))
}

/**
 * Watch for changes on the css source folder to trigger the copyCss function.
 */
function watchCss() {
  return gulp.watch('src/css/**/*.scss', buildCss);
}

/**
 * Watches for changes on the build folder to trigger a browser reload.
 */
function watchBuild() {
  return gulp.watch('build/**/*', reloadBrowser);
}

/**
 * Watches for changes on the pot source files to trigger the pot build
 */
function watchPot() {
  return gulp.watch(potFiles, buildPot);
}

/**
 * Deletes all build related files
 */
function cleanBuild() {
  return del([ 'build/**', 'languages/**', `${pluginName}.zip` ]);
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

// Groups all watch functions
const watch = gulp.parallel(watchCss, watchBuild, watchPot);

// Groups all build functions
const build = gulp.parallel(buildCss, buildPot);

// Starts a browser sync instance and watches for changes.
const defaultTask = gulp.parallel(syncBrowser, build, watch);

// Exports tasks to CLI
module.exports = {
  default: defaultTask,
  'build': build,
  'sync': syncBrowser,
  'watch': watch,
  'zip': makeZip,
  'clean:build': cleanBuild
};
