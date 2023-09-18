import { MessageDialogController } from "~/common/front/messagedialog/MessageDialogController";
import { messageDialogKey } from "~/common/front/messagedialog/messageDialogKey";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(messageDialogKey, new MessageDialogController());
});
