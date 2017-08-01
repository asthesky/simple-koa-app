'use strict';
const fs = require("fs");
const path = require("path");
// 
const Router = require("koa-router");
// 
const Policy = require('./policy');
// 
const initial = (app, config) => {
    // 实例路由
    let router = Router({
        prefix: '/'
    });
    // 添加用户auth
    router.use(Policy.auth);

    // 添加控制器路由
    var appdir = path.join(__dirname, './');
    var applist = fs.readdirSync(appdir);
    applist = applist.filter(function (file) {
        var filepath = path.join(appdir, file);
        return fs.statSync(filepath).isDirectory();
    });
    applist.forEach(function (file) {
        var filepath = path.join(appdir, file);
        try {
            var filerouter = require(filepath);
            router.use(filerouter.routes());
            console.log(filepath);
        } catch (err) {
            console.log(err.stack);
        }
    });
    // 
    router.allowedMethods();

    //
    router.get("/index", function* () {
        if (!this.auth) {
            return this.redirect('login/index');
        }
        yield this.render('index', {
            title: 'index'
        });
    });

    // 默认路由设置
    router.get("*", function* () {
        yield this.render('common/404', {
            title: '404'
        });
    });

    // 附加到应用
    app.use(router.routes());
};
// 
module.exports = {
    initial
};


