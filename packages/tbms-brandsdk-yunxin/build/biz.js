"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ----------------------------------
 * @file biz.ts
 * @desc 处理数据业务层接口
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
const constant_1 = require("./constant");
const tbms_util_1 = require("tbms-util");
const sha1_1 = __importDefault(require("sha1"));
const getAccountToken = async (accid) => {
    const time = Math.round(+new Date() / 1000);
    const hash = tbms_util_1._.md5(accid);
    const response = await fetch('https://api.netease.im/nimserver/user/refreshToken.action', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "AppKey": constant_1.APP_CONFIG.appkey,
            "Nonce": hash,
            "CurTime": '' + time,
            "CheckSum": sha1_1.default(constant_1.APP_CONFIG.appSecret + hash + time)
        },
        body: `accid=${accid}`
    });
    return response.json();
};
exports.getAccountToken = getAccountToken;
