/**
 * ----------------------------------
 * @file index.ts
 * @desc branksdk, tbms, yunxin
 * @author tbms-brandsdk-yunxin
 * ----------------------------------
 */
export default class {
    private core;
    private options;
    constructor(options: any);
    init(): void;
    /**
     * 获取离线消息
     * @param options
     */
    getHistoryMessage(options: any): void;
    /**
     * 发送实时消息
     * @param data
     */
    sendMsg(data: any): void;
}
