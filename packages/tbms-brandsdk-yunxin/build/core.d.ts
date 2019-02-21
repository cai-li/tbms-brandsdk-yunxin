/**
 * ----------------------------------
 * @file core.ts
 * @desc 对云信SDK的二次封装，加入中间件模式, 分装复杂逻辑 和 数据适配层工作
 * @author Matrix <18967131010@163.com>
 * @create: 2018/05
 * ----------------------------------
 */
import TBMS from 'tbms-sdk';
export default class extends TBMS {
    private sdk?;
    constructor(options: any);
    init(options: any): Promise<void>;
    getInstance(options: any): void;
}
