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
import merge from 'lodash/merge';
import { APP_CONFIG } from './constant';
import { getAccountToken } from './biz';
const MSG_EVENT_CONSTANT = Constant.MSG_EVENT_CONSTANT;
export default class extends TBMS {
    constructor(options) {
        super(options);
        this.conversation = {};
        this.user = {};
        this.options = options;
        // 初始化用户属性
        this.user = merge({
            uid: options.uid,
            touid: options.touid
        }, options.user);
        // 初始化会话属性
        this.convesation = {};
        // 设置
        this.init(options);
    }
    async init(options) {
        const result = await getAccountToken(options.uid);
        this.getInstance({
            token: result.info.token,
            accid: result.info.accid
        });
    }
    /**
   * @override handleContextExternal
   * @desc 子类复写，更改执行上下文
   * @param ctx 上下文变量更改
   * @param val
   */
    handleContextExternal(ctx, val) {
        ctx.conversation = this.conversation;
        ctx.user = this.user;
        ctx.options = this.options;
        return ctx;
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
            onsessions: (sessions) => {
                this.conversation = sessions[0] || {}; // 单聊有且只有一个会话对象
                this.dispatchConversation(this.conversation);
            },
            onmsg: (msg) => {
                msg.id = msg.idClient; // 取唯一标识
                this.emit(MSG_EVENT_CONSTANT.RECEIVE_MSG, msg);
            }
        });
    }
    sendText(options) {
        this.sdk.sendText(options);
    }
    getOfflineMessage(options) {
        this.sdk.getHistoryMsgs(options);
    }
}
