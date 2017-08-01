'use strict';
//
const mongoose = require('mongoose');
//
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    // 用户名
    username: { type: String, required: true },
    // 密码盐
    hashsalt: String,
    // 密码
    hashpwd: String,
    // 姓名
    name: String,
    // 手机
    phone: String,
    // 部门
    departName: String,
    // 头像
    avatar: String,
    // 角色
    roles: { type: String, default: '队员' },
    // 
    pagelist: [
        {
            pageid: { type: String, required: true },
            pagename: String,
            pagegroup: String
        }
    ],
    // 
    creator: String,
    updater: String,
}, {
        timestamps: true,
        versionKey: false
    });

// 
// UserSchema.virtual('userInfo').get(() => ({
//     'name': this.name,
//     'jobNumber': this.jobNumber,
//     'departName': this.departName,
//     'permissions': this.permissions,
// }));

// 
// UserSchema.virtual('token').get(() => ({
//     '_id': this._id,
//     'permissions': this.permissions
// }));

// 
// UserSchema.methods = {
//     //检查用户权限
//     hasPermission: function (role) {
//         var selfRoles = this.role;
//         return (selfRoles.indexOf('admin') !== -1 || selfRoles.indexOf(role) !== -1);
//     },
//     getUserByjobId: function* (id) {
//         return this.model('User').findOne({
//             jobNumber: id
//         });
//     },
// }

// UserSchema.set('toObject', { virtuals: true });
// 
module.exports = mongoose.model('User', UserSchema);
