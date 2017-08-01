'use strict';
// 
const path = require("path");
// 
const redisStore = require('koa-redis');
const session = require("koa-generic-session");
const kbody = require("koa-body");
const kstatic = require("koa-static");
const compress = require("koa-compress");
const passport = require('koa-passport');
const ejs = require('koa-ejs');
const jsonp = require('koa-safe-jsonp');
const logger = require("koa-logger");
// 
const datebase = require('../middleware/database/index');
const loadir = require('require-all');

const initial = function (app, config) {
    // 密钥
    app.keys = config.session.secrets;

    // 连接数据库
    app.use(datebase.mongodb({
        uri: config.mongo.uri,
        options: config.mongo.options
    }));
    loadir(path.join(__dirname, '../model'));

    // 使用压缩
    app.use(compress());

    // 使用静态访问
    app.use(kstatic(path.join(__dirname, '../../public')));

    // 使用body解析
    app.use(kbody({
        uploadDir: path.join(__dirname, '../../public'),
        multipart: true
    }));

    // 使用redis 缓存 session
    var sessionStore = new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        auth_pass: config.redis.pass || ''
    });
    sessionStore.on('connect', function () {
        console.log('sessionStore: connect  success!');
    });
    sessionStore.on('error', function (err) {
        console.log(err)
    });
    app.use(session({
        key: config.session.keys,
        store: sessionStore,
        cookie: config.session.cookie
    }));

    // 使用 session 检测
    app.use(passport.initialize());

    // 使用jsonp
    jsonp(app, {
        callback: 'callback'
    });

    // 使用模版引擎
    ejs(app, {
        root: path.join(__dirname, '../view'),
        layout: false,
        viewExt: 'html',
        cache: false,
        debug: true
    });
};

module.exports = {
    initial
};