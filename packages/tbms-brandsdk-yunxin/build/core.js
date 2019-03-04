/**
 * ----------------------------------
 * @file core.ts
 * @desc 对云信SDK的二次封装，加入中间件模式, 分装复杂逻辑 和 数据适配层工作
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
import TBMS from 'tbms-sdk';
import { Constant } from 'tbms-util';
import { APP_CONFIG } from './constant';
import { getAccountToken } from './biz';
const MSG_EVENT_CONSTANT = Constant.MSG_EVENT_CONSTANT;
export default class extends TBMS {
    constructor(options) {
        super(options);
        this.options = options;
        this.init(options);
    }
    async init(options) {
        const result = await getAccountToken(options.uid);
        this.getInstance({
            token: result.info.token,
            accid: result.info.accid
        });
    }
    getInstance(options) {
        this.sdk = NIM.getInstance({
            appKey: APP_CONFIG.appkey,
            token: options.token,
            account: options.accid,
            onconnect: (event) => {
                this.emit(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, event);
            },
            onerror: (event) => {
                this.emit(MSG_EVENT_CONSTANT.LOGIN_ERROR, event);
            },
            onroamingmsgs: (obj) => {
                const msgs = obj.msgs;
                this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            },
            onofflinemsgs: (obj) => {
                const msgs = obj.msgs;
                this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            },
            onmsg: (obj) => {
                const msgs = obj.msgs;
                this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
            }
        });
    }
}
