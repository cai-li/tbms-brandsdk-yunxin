/**
 * ----------------------------------
 * @file index.ts
 * @desc branksdk, tbms, yunxin
 * @author tbms-brandsdk-yunxin
 * ----------------------------------
 */
import { Constant } from 'tbms-util';
import Core from './core';
import { messageEncodeFlow, messageDecodeFlow } from './middleware';
import merge from 'lodash/merge';
const MSG_EVENT_CONSTANT = Constant.MSG_EVENT_CONSTANT;
export default class {
    constructor(options) {
        this.options = {
            appkey: "",
            targetType: "",
            uid: "",
            touid: "",
            bizCode: "",
            user: {},
            onmsg: () => { },
            onofflinemsg: () => { },
            onerror: () => { },
            onclose: () => { },
            onconversation: () => { },
            onsystemmsg: () => { },
            onlogin: () => { }
        };
        this.options = options;
        this.core = new Core(options);
        this.core.useBatch([messageEncodeFlow, messageDecodeFlow]);
        this.init();
    }
    /**
     * 初始化，事件监听
     */
    init() {
        this.core.on(MSG_EVENT_CONSTANT.RECEIVE_MSG, (msg) => {
            this.core.dispatchMsg(msg);
        });
        this.core.on(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, (event) => {
            this.core.dispatchLogin(event);
        });
        this.core.on(MSG_EVENT_CONSTANT.LOGIN_ERROR, (event) => {
            this.options.onerror(event);
        });
        this.core.on(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, (msgs) => {
            msgs.forEach((msg) => {
                this.core.dispatchOfflineMsg(msg);
            });
        });
    }
    /**
     * 获取离线消息
     * @param options
     */
    getHistoryMessage(options) {
        this.core.getOfflineMessage(merge({
            to: this.options.touid,
            scene: 'p2p',
            limit: 20
        }, options, {
            done: (err, obj) => {
                if (err) {
                    this.core.dispatchError(err);
                }
                else {
                    obj.msgs.forEach((msg) => {
                        msg.id = msg.idClient;
                        this.core.dispatchOfflineMsg(msg);
                    });
                }
            }
        }));
    }
    /**
     * 发送实时消息
     * @param data
     */
    sendMsg(data) {
        let { type = '' } = data;
        switch (type) {
            case 'text':
                this.core.sendText({
                    scene: 'p2p',
                    to: this.options.touid,
                    text: data.content,
                    done: (error, msg) => {
                        if (error) {
                            this.core.dispatchError(error);
                        }
                        else {
                            msg.id = msg.idClient;
                            this.core.dispatchMsg(msg);
                        }
                    }
                });
        }
    }
}
