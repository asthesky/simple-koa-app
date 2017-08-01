'use strict';

// 测试环境配置
// ==================================
module.exports = {
    //开发环境mongodb配置
    mongo: {
        uri: 'mongodb://127.0.0.1:27017/GENGER',
        host: '127.0.0.1',
        port: 27017,
        database: 'sinapp',
        options: {
            user: '',
            pass: ''
        }
    },
    //开发环境redis配置
    redis: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 3000,
        pass: '',
        prefix: 'app:',
    }
};
