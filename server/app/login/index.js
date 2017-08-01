'use strict';
// 
const Router = require("koa-router");
// 
const controller = require('./controller');
// 
let router = Router({
    prefix: '/login'
});
/* ******** 用户相关 ******** */
// 
router.post('/authlogin', controller.authlogin);
router.get('/authlogout', controller.authlogout);
// 
router.get('/index', controller.index);


// 默认路由设置
router.get("/*", function* () {
    if (this.auth) {
        return this.redirect('/index');
    } else {
        return this.redirect('login/index');
    }
});

module.exports = router;





