"use strict";
// 
var path = require('path');
var fs = require('fs');
// 
var staticPath = path.join(__dirname, '../../../public/');
var extList = ['.jpg', '.jpeg', '.png', '.webp'];

exports.uploadpic = function* (file) {
    var statusdata = {
        StatusCode: 0,
        Message: '',
        Name: '',
        FullPath: null
    };
    // 
    if (file['path']) {
        var tempPath = file['path'];
        var tempName = file['name'].split('.');
        var tempExt = '.' + tempName[tempName.length - 1];
        if (extList.indexOf(tempExt.toLowerCase()) > -1) {
            var retPath = '/img/' + parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + tempExt;
            var destPath = path.join(staticPath, '.' + retPath);
            var stream = fs.createWriteStream(destPath);
            fs.createReadStream(tempPath).pipe(stream);
            statusdata.StatusCode = 1;
            statusdata.FullPath = retPath;
        } else {
            statusdata.StatusCode = 2;
            statusdata.Message = '只允许jpg和png！';
        }
    } else {
        statusdata.Message = '无法获取文件信息！'
    }
    return statusdata;
};