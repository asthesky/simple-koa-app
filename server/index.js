"use strict";
// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// 
const path = require('path');
const fs = require('fs');

// 加载koa和配置
const app = require('koa')();
const config = require('./config/');

// 加载核心
const kernel = require('./kernel/');
kernel.initial(app, config);

// 加载应用池
const apppool = require('./app/');
apppool.initial(app, config);

// 
app.on('error', (err, ctx) => {
  console.error('error', err);
});
// 
app.listen(config.site.port, function () {
  console.log('server listening on %d, in %s mode', config.site.port, config.site.env);
});

// require('./mock')();

module.exports = app;

