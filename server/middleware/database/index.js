'use strict';

const path = require('path');
const fs = require('fs');

const bluebird = require('bluebird');

// 
module.exports = {
    mongodb(options) {
        // 
        const mongoose = require('mongoose');
        mongoose.Promise = bluebird;
        // 创建数据库连接
        let db = mongoose.connection;
        mongoose.connect(options.uri, options.options || {});

        db.on('error', function (err) {
            console.log(`mongodb: error connect!`);
        });
        db.once('open', function () {
            console.log(`mongodb: connect  success!`);
        });
        // 
        return function* ctrl(next) {
            if (!this.db) {
                this.db = function (type) {
                    var model;
                    try {
                        model = mongoose.model(type);
                    } catch (err) {
                        console.log(err)
                    }
                    return model;
                }
                this.db.mongoose = mongoose;
            }

            yield next;
        };
    }


}