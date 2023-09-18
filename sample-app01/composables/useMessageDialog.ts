import { messageDialogKey } from "@/common/front/messagedialog/messageDialogKey";
import { MessageDialogController } from "@/common/front/messagedialog/MessageDialogController";

export default function useMessageDialog(
  abortWhenUnmount = true
): MessageDialogController {
  const messageDialog = inject(messageDialogKey);
  if (messageDialog == undefined) {
    throw new Error(`messageDialog is not found`);
  }

  if (abortWhenUnmount) {
    //ダイアログが表示されているコンポーネントが廃棄されるときにダイアログが表示されていれば、ダイアログも閉じる
    onBeforeUnmount(() => {
      messageDialog.abort();
    });
  }

  return messageDialog;
}
