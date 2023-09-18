import { MessageDialogController } from "./MessageDialogController";

/**
 * メッセージダイアログをinjectするためのキー
 */
const messageDialogKey: InjectionKey<MessageDialogController> = Symbol();
export { messageDialogKey };