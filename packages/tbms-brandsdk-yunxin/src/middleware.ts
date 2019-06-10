import merge from 'lodash/merge';
import isString from 'lodash/isString';
import { _ } from 'tbms-util';


const ImageRectangle = 400;
/**
 * 解码中间件流
 * @param ctx
 * @param next
 */
export const messageDecodeFlow = function(ctx:any, next:any) {
  let message = ctx.message;

  if (message.from && message.to && message.from !== message.to) {
    message.conversationId = message.sessionId;
    message.scene = 'single';
    message.status = 'success';
    switch(message.type) {
      case 'text': // 文本消息
        merge(message, {
          type: 'text',
          content: message.text
        });
        break;
      default:
        merge(message, {
          type: 'text',
          content: '目前版本暂不支持该功能'
        })
        break;
    }
  }

  next();
}

/**
 * 编码中间件流
 * @param ctx
 * @param next
 */
export const messageEncodeFlow = function(ctx: any, next: any) {
  let message = ctx.message;
  if (message.from && message.to && message.from === message.to) {
    message.conversationId = ctx.conversation.conversationId;
    message.scene = 'single';
    message.status = 'success';
    message.idClient = message.id;
  }
  next();
}
