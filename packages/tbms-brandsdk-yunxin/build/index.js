"use strict";
/**
 * ----------------------------------
 * @file index.ts
 * @desc branksdk, tbms, yunxin
 * @author tbms-brandsdk-yunxin
 * ----------------------------------
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("./core"));
const constant_1 = require("tbms-util/build/constant");
class default_1 {
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
        this.core = new core_1.default(options);
        this.init();
    }
    init() {
        this.core.on(constant_1.MSG_EVENT_CONSTANT.RECEIVE_MSG, (msgs) => {
            msgs.forEach((msg) => {
                this.core.dispatchMsg(msg);
            });
        });
        this.core.on(constant_1.MSG_EVENT_CONSTANT.LOGIN_SUCCESS, (event) => {
            this.core.dispatchLogin(event);
        });
        this.core.on(constant_1.MSG_EVENT_CONSTANT.LOGIN_ERROR, (event) => {
            this.options.onerror(event);
        });
        this.core.on(constant_1.MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, (msgs) => {
            msgs.forEach((msg) => {
                this.core.dispatchOfflineMsg(msg);
            });
        });
    }
}
exports.default = default_1;
