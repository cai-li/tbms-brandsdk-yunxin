"use strict";
/**
 * ----------------------------------
 * @file core.ts
 * @desc 对云信SDK的二次封装，加入中间件模式, 分装复杂逻辑 和 数据适配层工作
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbms_sdk_1 = __importDefault(require("tbms-sdk"));
const constant_1 = require("./constant");
const biz_1 = require("./biz");
const constant_2 = require("tbms-util/build/constant");
class default_1 extends tbms_sdk_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this.init(options);
    }
    async init(options) {
        const token = await biz_1.getAccountToken(options.uid);
        this.getInstance(Object.assign(options, {
            token: token
        }));
    }
    getInstance(options) {
        this.sdk = NIM.getInstance({
            appkey: constant_1.APP_CONFIG.appkey,
            token: options.token,
            account: options.uid,
            onconnect: (event) => {
                this.emit(constant_2.MSG_EVENT_CONSTANT.LOGIN_SUCCESS, event);
            },
            onerror: (event) => {
                this.emit(constant_2.MSG_EVENT_CONSTANT.LOGIN_ERROR, event);
            },
            onroamingmsgs: (obj) => {
                const msgs = obj.msgs;
                this.emit(constant_2.MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            },
            onofflinemsgs: (obj) => {
                const msgs = obj.msgs;
                this.emit(constant_2.MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            },
            onmsg: (obj) => {
                const msgs = obj.msgs;
                this.emit(constant_2.MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            }
        });
    }
}
exports.default = default_1;
