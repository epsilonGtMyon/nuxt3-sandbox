import { toastKey } from "~/common/front/toast/toastKey";
import {
  ToastHelper,
} from "~/common/front/toast/ToastController";

export default function useToast() {
  const toast = inject(toastKey);
  if (toast == undefined) {
    throw new Error(`toast is not found`);
  }

  const scope = Symbol();
  const toastHelper = new ToastHelper(toast, scope);

  onBeforeUnmount(() => {
    toast.closeScope(scope);
  });

  return {
    toast,
    toastHelper,
  };
}
