'use strict';
// 
var path = require('path');
// 环境配置
const envKey = process.env.NODE_ENV || "development";
const envConfig = require("./env/" + envKey);
// 其他配置
// const app = require("./app");

const config = {
    // 站点配置
    site: {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 7890
    },
    // 路径相关
    path: {
        root: path.normalize(__dirname + '/../../..')
    },
    // mongodb配置
    mongo: {
    },
    // redis 配置
    redis: {
    },
    // session 配置
    session: {
        keys: 'nemos.sid',
        secrets: ['secret'],
        cookie: {
            maxAge: 60 * 60 * 24 * 7 * 30
        }
    },
    // ldap 配置
    ldap: {

    }
}

Object.assign(config, envConfig);

module.exports = config;
