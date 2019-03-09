import merge from 'lodash/merge';
const ImageRectangle = 400;
/**
 * 解码中间件流
 * @param ctx
 * @param next
 */
export const messageDecodeFlow = function (ctx, next) {
    let message = ctx.message;
    if (message.from && message.to && message.from !== message.to) {
        message.conversationId = message.sessionId;
        message.scene = 'single';
        message.status = 'success';
        switch (message.type) {
            case 'text': // 文本消息
                merge(message, {
                    type: 'text',
                    content: message.text
                });
                break;
            case 1: // 图片消息
                // const imageInfo = _.getImageDimension(message.msg) // async promise return,  please use next()
                // merge(message, {
                //   type: 'image',
                //   file: {
                //     url: message.msg,
                //     h: imageInfo.height ? imageInfo.height : ImageRectangle,
                //     w: imageInfo.width ? imageInfo.width : ImageRectangle
                //   }
                // })
                break;
            default:
                merge(message, {
                    type: 'text',
                    content: '目前版本暂不支持该功能'
                });
                break;
        }
    }
    next();
};
/**
 * 编码中间件流
 * @param ctx
 * @param next
 */
export const messageEncodeFlow = function (ctx, next) {
    let message = ctx.message;
    if (message.from && message.to && message.from === message.to) {
        message.conversationId = ctx.conversation.conversationId;
        message.scene = 'single';
        message.status = 'success';
        message.idClient = message.id;
    }
    next();
};
