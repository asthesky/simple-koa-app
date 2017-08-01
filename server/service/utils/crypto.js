'use strict';
// 
const crypto = require('crypto');
// 
const secret = 'secret';

const expiresLen = 1000 * 60 * 60 * 24 * 7;

//加密
const encrypt = (value, secret) => {
    var cipher = crypto.createCipher('aes-256-cbc', secret);
    var enc = cipher.update(value, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//解密
const decrypt = (value, secret) => {
    try {
        var decipher = crypto.createDecipher('aes-256-cbc', secret);
        var dec = decipher.update(value, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (err) {
        throw (err);
    }
}

// 创建token
const settoken = (userid) => {
    try {
        var expiresTime = Date.now() + expiresLen;
        var tokeninfo = encrypt(JSON.stringify([userid, expiresTime]), secret);
        return {
            token: tokeninfo,
            expires: expiresTime
        }
    } catch (err) {
        throw (err);
    }
}

// 解析token
const gettoken = (token) => {
    try {
        var expiresTime = Date.now() + 1;
        // 
        var tokeninfo = JSON.parse(decrypt(token, secret));
        if (tokeninfo) {
            if (tokeninfo[0] && tokeninfo[1] >= expiresTime) {
                return tokeninfo[0];
            }
        }
        return null;
    } catch (err) {
        throw (err);
    }
}

const md5 = (value) => {
    try {
        var md5 = crypto.createHash('md5');
        var password = md5.update(value).digest('hex');
        return password;
    } catch (err) {
        throw (err);
    }
}


module.exports = {
    encrypt,
    decrypt,
    settoken,
    gettoken,
    expiresLen,
    md5
}



