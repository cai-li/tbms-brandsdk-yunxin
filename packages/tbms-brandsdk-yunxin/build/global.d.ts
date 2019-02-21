export interface IJSONObject {
    [key: string]: any;
}
export interface MessageEntityObject {
    type: string;
    content: string;
    time?: number;
    header?: object;
}
export interface ContextObject {
    conversation?: object;
    message?: object;
    systemMessage?: object;
    app?: object;
    user?: object;
    options?: object;
}
export interface CCOptionsObject {
    uid: string;
    touid: string;
    bizCode: string;
    appkey: string;
    targetType: string;
    user: object;
    onmsg: (...args: any[]) => any;
    onerror: (...args: any[]) => any;
    onclose: (...args: any[]) => any;
    onofflinemsg: (...args: any[]) => any;
    onconversation: (...args: any[]) => any;
    onsystemmsg: (...args: any[]) => any;
    onlogin: (...args: any[]) => any;
}
export interface ManageOptionsObject {
    onsync: (...args: any[]) => any;
}
export declare type ICallback = (...args: any[]) => any;
