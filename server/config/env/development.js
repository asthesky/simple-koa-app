'use strict';

// 生产环境配置
// ==================================
module.exports = {
    //生产环境mongodb配置
    mongo: {
        uri: 'mongodb://127.0.0.1:27017/sinapp',
        host: '127.0.0.1',
        port: 27017,
        database: 'sinapp',
        options: {
            user: '',
            pass: ''
        }
    },
    //生产环境redis配置
    redis: {
        host: '127.0.0.1',
        port: 6379,
        ttl: 3000,
        // db: 0,
        pass: '',
        prefix: 'app:',
    }
};
