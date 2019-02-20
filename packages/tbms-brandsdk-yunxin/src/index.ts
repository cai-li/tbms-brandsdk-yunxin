/**
 * ----------------------------------
 * @file index.ts
 * @desc branksdk, tbms, yunxin
 * @author tbms-brandsdk-yunxin
 * ----------------------------------
 */

import _ from 'tbms-util/build/util';
import Core from './core';
import { MSG_EVENT_CONSTANT } from 'tbms-util/build/constant';
import { CCOptionsObject } from './global';
export default class {
  private core: any
  private options: CCOptionsObject = {
    appkey: "",
    targetType: "",
    uid: "",
    touid: "",
    bizCode: "",
    user: {},
    onmsg: () => {},
    onofflinemsg: () => {},
    onerror: () => {},
    onclose: () => {},
    onconversation: () => {},
    onsystemmsg: () => {},
    onlogin: () => {}
  };
  constructor(options: any) {
    this.options = options;
    this.core = new Core(options);
    this.init();
  }

  init() {
    this.core.on(MSG_EVENT_CONSTANT.RECEIVE_MSG, (msgs: any) => {
      msgs.forEach((msg: any) => {
        this.core.dispatchMsg(msg);
      })
    });

    this.core.on(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, (event: any) => {
      this.core.dispatchLogin(event);
    });

    this.core.on(MSG_EVENT_CONSTANT.LOGIN_ERROR, (event: any) => {
      this.options.onerror(event);
    });

    this.core.on(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, (msgs: any) => {
      msgs.forEach((msg: any) => {
        this.core.dispatchOfflineMsg(msg);
      });
    });
  }

}
