const gulp = require('gulp'); //gulp本体
const del = require('del'); //ファイルの削除

const postcss = require('gulp-postcss'); //gulpでPostCSSを実行
const autoprefixer = require('autoprefixer'); //Autoprefixer
var csscomb = require('gulp-csscomb'); //csscomb

//scss
const sass = require('gulp-dart-sass'); //Dart Sass はSass公式が推奨 @use構文などが使える
const plumber = require('gulp-plumber'); // エラーが発生しても強制終了させない
const notify = require('gulp-notify'); // エラー発生時のアラート出力
const browserSync = require('browser-sync'); //ブラウザリロード
const mqpacker = require('css-mqpacker'); //メディアクエリをまとめる

//画像圧縮
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

// WebPでの画像圧縮
const webp = require('gulp-webp');

const rename = require('gulp-rename');

// 入出力するフォルダを指定
const srcBase = './_static/src';
const distBase = './_static/dist';

const srcPath = {
  scss: srcBase + '/scss/**/*.scss',
  html: srcBase + '/**/*.html',
  img: srcBase + '/img/**/*',
  js: srcBase + '/js/**/*.js',
  php: srcBase + '/**/*.php',
  font: srcBase + '/font/**/*',
};

const distPath = {
  css: distBase + '/css/',
  html: distBase + '/',
  img: distBase + '/img/',
  js: distBase + '/js/',
  php: distBase + '/',
  font: distBase + '/font/',
};

/**
 * clean
 */
const clean = () => {
  return del(distBase + '/**');
};

/**
 * sass
 *
 */
const cssSass = () => {
  return gulp
    .src(srcPath.scss, {
      sourcemaps: true,
    })
    .pipe(
      //エラーが出ても処理を止めない
      plumber({
        errorHandler: notify.onError('Error:<%= error.message %>'),
      })
    )
    .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
    .pipe(postcss([autoprefixer()])) //autoprefixer
    .pipe(postcss([mqpacker()])) // メディアクエリをまとめる
    .pipe(gulp.dest(distPath.css, { sourcemaps: './' })) //コンパイル先
    .pipe(browserSync.stream())
    .pipe(
      notify({
        message: 'Sassをコンパイルし、ベンダープレフィックスを付与しました！',
        onLast: true,
      })
    );
};

/**
 * html
 */
const html = () => {
  return gulp.src(srcPath.html).pipe(gulp.dest(distPath.html));
};

/**
 * 画像圧縮
 */
const imgImagemin = () => {
  return gulp
    .src(srcPath.img)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 80,
          }),
          imageminPngquant(),
        ],
        {
          verbose: true,
        }
      )
    )
    .pipe(gulp.dest(distPath.img));
};

// WebPへの変換
gulp.task('webp', function () {
  return gulp
    .src(srcPath.img)
    .pipe(
      rename(function (path) {
        path.basename += path.extname;
      })
    )
    .pipe(webp())
    .pipe(gulp.dest(distPath.img));
});

/**
 * js
 */
const js = () => {
  return gulp.src(srcPath.js).pipe(gulp.dest(distPath.js));
};

/**
 * php
 */
const php = () => {
  return gulp.src(srcPath.php).pipe(gulp.dest(distPath.php));
};

/**
 * 独自fontをsrc配下に読み込む際の対応
 */
const font = () => {
  return gulp.src(srcPath.font).pipe(gulp.dest(distPath.font));
};

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};

const browserSyncOption = {
  server: './_static/dist/',
};

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

/**
 *
 * ファイル監視 ファイルの変更を検知したら、browserSyncReloadでreloadメソッドを呼び出す
 * series 順番に実行
 * watch('監視するファイル',処理)
 */
const watchFiles = () => {
  gulp.watch(srcPath.js, gulp.series(js, browserSyncReload));
  gulp.watch(srcPath.html, gulp.series(html, browserSyncReload));
  gulp.watch(srcPath.scss, gulp.series(cssSass));
  gulp.watch(srcPath.img, gulp.series(imgImagemin, browserSyncReload));
  gulp.watch(srcPath.php, gulp.series(php, browserSyncReload));
  gulp.watch(srcPath.font, gulp.series(font, browserSyncReload));
};

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 *
 * 一度cleanでdistフォルダ内を削除し、最新のものをdistする
 */
exports.default = gulp.series(
  clean,
  gulp.parallel(html, cssSass, imgImagemin, js, php, font),
  gulp.parallel(watchFiles, browserSyncFunc)
);
