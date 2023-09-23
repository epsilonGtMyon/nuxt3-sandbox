import { ToastController } from "./ToastController";

/**
 * トーストコントローラーをinjectするためのキー
 */
const toastKey: InjectionKey<ToastController> = Symbol();
export { toastKey };
