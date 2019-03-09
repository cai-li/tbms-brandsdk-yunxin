/**
 * ----------------------------------
 * @file core.ts
 * @desc 对云信SDK的二次封装，加入中间件模式, 分装复杂逻辑 和 数据适配层工作
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
import TBMS from 'tbms-sdk';
import { ContextObject, IJSONObject } from './global';
export default class extends TBMS {
    private sdk?;
    conversation: IJSONObject;
    user: IJSONObject;
    constructor(options: any);
    init(options: any): Promise<void>;
    /**
   * @override handleContextExternal
   * @desc 子类复写，更改执行上下文
   * @param ctx 上下文变量更改
   * @param val
   */
    handleContextExternal(ctx: ContextObject, val: ContextObject): ContextObject;
    getInstance(options: any): void;
    sendText(options: any): void;
    getOfflineMessage(options: any): void;
}
