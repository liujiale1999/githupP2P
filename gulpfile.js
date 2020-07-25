//声明变量
const { src, dest, watch, series } = require('gulp');
const uglify = require("gulp-uglify");  //压缩js
const rename = require("gulp-rename"); //重命名
const less = require("gulp-less");//编译less
const cleanCss = require("gulp-clean-css"); //压缩css
const imgMin = require("gulp-imagemin"); //压缩图片
const  webserver = require('gulp-webserver');//启服务

function jsTask() {
    return src("./js/**/*.js") //读取目标文件  匹配js文件夹下的所有.js文件
        .pipe(uglify())     //压缩js
        .pipe(rename({ suffix: '.min' }))     //重命名
        .pipe(dest("./dist/js"));    //输出目录
}

function cssTask() {
    return src("./less/**/*.less")  //读取目标文件  匹配less文件夹下的所有.less文件
        .pipe(less())     //编译less
        .pipe(cleanCss())     //压缩css
        .pipe(rename({ suffix: '.min' }))     //重命名
        .pipe(dest("./dist/css"));    //输出目录
}

function imgTask(){
    return src("./images/**/*")  //读取目标文件  匹配less文件夹下的所有.less文件
        .pipe(imgMin())     //压缩图片
        .pipe(dest("./dist/images"));    //输出目录
}

function watchTask(cb){
    watch("./less/**/*.less",{
        events:["add","change"] //添加文件，修改文件操作会触发任务
    },cssTask);

    watch("./images/**/*",{
        events:["add","change"] //添加文件，修改文件操作会触发任务
    },imgTask);
    cb();
} 

function serve(){
    src("./")   //设置项目根路径
    .pipe(webserver({
        livereload: true, // 启用LiveReload
        open: true, // 服务器启动时自动打开网页
        port:8989
    }))
}

// 上线的时候执行一次
exports.jsTask = jsTask;
// exports.cssTask = cssTask;
// exports.imgTask = imgTask;
exports.watchTask = watchTask;
exports.serve = serve;

exports.default = series(watchTask,serve);
