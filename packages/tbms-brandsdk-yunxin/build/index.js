/**
 * ----------------------------------
 * @file index.ts
 * @desc branksdk, tbms, yunxin
 * @author tbms-brandsdk-yunxin
 * ----------------------------------
 */
import { Constant } from 'tbms-util';
import Core from './core';
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
        this.init();
    }
    init() {
        this.core.on(MSG_EVENT_CONSTANT.RECEIVE_MSG, (msgs) => {
            msgs.forEach((msg) => {
                this.core.dispatchMsg(msg);
            });
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
}
