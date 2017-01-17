var gulp = require("gulp");
var del = require("del");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var replace = require("gulp-replace");
var sourcemaps = require("gulp-sourcemaps");
var p = require("./package.json");

gulp.task("typescript", ["clean-scripts"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    return gulp.src(["./typings/**/*.d.ts", "./src/**/*.ts", "./index.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(replace(/(}\)\()(.*\|\|.*;)/g, '$1/* istanbul ignore next */$2'))
        .pipe(replace(/(var __extends = \(this && this.__extends\))/g, '$1/* istanbul ignore next */'))
        .pipe(replace(/(if \(!exports.hasOwnProperty\(p\)\))/g, '/* istanbul ignore else */ $1'))
        // ignore empty constructors (for mixins and static classes)
        .pipe(replace(/(function [A-Za-z]+\(\) {[\s\n\t]+})/g, '/* istanbul ignore next */ $1'))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("tslint", function() {
    return gulp.src(["./src/**/*.ts", "!./typings/**/*.d.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }));
});

gulp.task("clean-scripts", function(cb) {
    return del(["./dist/**/*"], cb);	
});

gulp.task("clean-typings", function(cb) {
    return del(["./typings"], cb);
});

gulp.task("build", ["tslint", "typescript"]);