import { MessageDialogController } from "~/common/front/messagedialog/MessageDialogController";
import { messageDialogKey } from "~/common/front/messagedialog/messageDialogKey";
import { ToastController } from "~/common/front/toast/ToastController";
import { toastKey } from "~/common/front/toast/toastKey";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(messageDialogKey, new MessageDialogController());
  nuxtApp.vueApp.provide(toastKey, new ToastController());
});
