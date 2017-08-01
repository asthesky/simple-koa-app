'use strict';
// 
const service = require('./service');
// 
/*  ********* api ********  */

// 登录
exports.authlogin = function* () {
    var username = this.request.body.username ? this.request.body.username.trim() : '';
    const pwd = this.request.body.pwd ? this.request.body.pwd.trim() : '';
    // 
    if (!username || !pwd) {
        return this.body = service.status.invalid('参数不正确');
    }
    // 
    try {
        var UserModel = this.db('User');
        var userInfo = yield UserModel.findOne({
            username: username
        });
        // hack todo
        // if (!userInfo) {
        //     return this.body = service.status.invalid('登录失败');
        // } else {
        //     var hashpwd = service.crypto.settoken(pwd, userInfo.hashsalt);
        //     if (hashpwd !== userInfo.hashpwd) {
        //         return this.body = service.status.invalid('登录失败');
        //     }
        // }
        const crypteinfo = service.crypto.settoken(username);
        this.cookies.set('appid', crypteinfo.token, {
            expires: new Date(crypteinfo.expires)
        });
        this.body = service.status.succeed('登录成功');
    } catch (err) {
        this.body = service.status.servererr('系统错误');

    }
};
// 登出
exports.authlogout = function* () {
    this.cookies.set('appid', null);
    return this.redirect('/login/index');
}

/*  ********* 页面 ********  */
// 登录
exports.index = function* () {
    if (this.auth) {
        return this.redirect('/index');
    }
    yield this.render('login/index', {
        title: '登录'
    });
};