/**
 * ----------------------------------
 * @file core.ts
 * @desc 对云信SDK的二次封装，加入中间件模式, 分装复杂逻辑 和 数据适配层工作
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */

import TBMS from 'tbms-sdk';
import _ from 'tbms-util/util';
import { APP_CONFIG } from './constant';
import { getAccountToken } from './biz';
import { MSG_EVENT_CONSTANT } from 'tbms-util/build/constant'

declare var NIM: any;
export default class extends TBMS {
  private sdk?: any

  constructor(options: any) {
    super(options);
    this.options = options;
    this.init(options);
  }

  async init(options: any) {
    const result:any = await getAccountToken(options.uid);
    this.getInstance({
      token: result.info.token,
      accid: result.info.accid
    });
  }

  getInstance(options: any) {
    this.sdk = NIM.getInstance({
      appKey: APP_CONFIG.appkey,
      token: options.token,
      account: options.accid,
      onconnect: (event: any) => {
        this.emit(MSG_EVENT_CONSTANT.LOGIN_SUCCESS, event);
      },
      onerror: (event: any) => {
        this.emit(MSG_EVENT_CONSTANT.LOGIN_ERROR, event);
      },
      onroamingmsgs: (obj: any) => {
        const msgs = obj.msgs;
        this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
      },
      onofflinemsgs: (obj: any) => {
        const msgs = obj.msgs;
        this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
      },
      onmsg: (obj: any) => {
        const msgs = obj.msgs;
        this.emit(MSG_EVENT_CONSTANT.GET_OFFLINE_MSG, msgs);
      }
    })
  }
}
