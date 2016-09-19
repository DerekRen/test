var myGulp = require("gulp"),
    myLess = require("gulp-less"),
    myUgly = require("gulp-uglify"),
    myNofy = require('gulp-notify'),
    myPlum = require('gulp-plumber'),
    myAuto = require("gulp-autoprefixer");

myGulp.task("codeLess", function(){
  myGulp.src("src/less/index.less")
        .pipe(myPlum({errorHandler: myNofy.onError('Error: <%= error.message %>')}))
        .pipe(myLess())
        .pipe(myAuto({
              browsers: ['last 3 versions'],
              cascade: true,
              remove:true
          }))
        .pipe(myGulp.dest("dist/style"));
});

myGulp.task('jsMin', function () {
    myGulp.src("src/script/*.js")
          .pipe(myPlum({errorHandler: myNofy.onError('Error: <%= error.message %>')}))
          .pipe(myUgly())
          .pipe(myGulp.dest('dist/script'));
});
myGulp.task('img', function () {
    myGulp.src("src/images/*.*")
          .pipe(myPlum({errorHandler: myNofy.onError('Error: <%= error.message %>')}))
          .pipe(myGulp.dest('dist/images'));
});

myGulp.task("default", function(){
  myGulp.watch("src/**/*.*",["codeLess","jsMin","img"]);
});
