/**
 * ----------------------------------
 * @file biz.ts
 * @desc 处理数据业务层接口
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
import { APP_CONFIG } from './constant';
import { _ } from 'tbms-util';
import sha1 from 'sha1';

const getAccountToken = async (accid: string) => {
  const time =Math.round(+new Date() / 1000);
  const hash = _.md5(accid);
  const response:any = await fetch('https://api.netease.im/nimserver/user/refreshToken.action', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "AppKey": APP_CONFIG.appkey,
      "Nonce": hash,
      "CurTime": '' + time,
      "CheckSum": sha1(APP_CONFIG.appSecret + hash + time)
    },
    body: `accid=${accid}`
  });

  return response.json();
}


export {
  getAccountToken
}
