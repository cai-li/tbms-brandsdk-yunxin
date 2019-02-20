/**
 * ----------------------------------
 * @file biz.ts
 * @desc 处理数据业务层接口
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */



const getAccountToken = async (accid: string|number) => {
  await fetch('https://api.netease.im/nimserver/user/refreshToken.action', {
    method: 'POST',
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    body: JSON.stringify({accid: accid})
  });
}


export {
  getAccountToken
}
