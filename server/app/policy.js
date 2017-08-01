const status = require('../service/utils/status');
const crypto = require('../service/utils/crypto');

// 默认路由
exports.auth = function* (next) {
    // apptoken
    var apptoken = this.query.apptoken ? this.query.apptoken.replace(/(^\s+)|(\s+$)/g, "") : '';
    // cookie
    var cryptedUserId = this.cookies.get('appid');
    // 
    if (!apptoken && !cryptedUserId) {
        this.req.auth = null
    } else {
        if (!apptoken) {
            apptoken = cryptedUserId;
        } else {
            // 如果存在apptoken重写cookie
            const crypteinfo = crypto.settoken(username);
            this.cookies.set('appid', crypteinfo.token, {
                expires: new Date(Date.now() + crypto.expiresLen)
            });
        }
        // 
        try {
            var userid = crypto.gettoken(apptoken);
            if (!userid) {
                this.auth = null;
            } else {
                this.auth = userid;
            }
        } catch (e) {
            this.auth = null;
        };
    }
    // 
    yield next;
}