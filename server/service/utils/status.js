"use strict";
// 
const succeed = (data) => ({ code: 4000, data });
// 
const invalid = (error) => ({ code: 4001, message: "validation error", error });
// 
const forbidden = (error) => ({ code: 4003, message: "Permission Denied", error });
// 
const nofound = (error) => ({ code: 4004, message: "no record is found", error });
// 
const servererr = (error) => ({ code: 5001, message: "system error", error });

// 
module.exports = {
	succeed,
	invalid,
	forbidden,
	nofound,
	servererr
};
