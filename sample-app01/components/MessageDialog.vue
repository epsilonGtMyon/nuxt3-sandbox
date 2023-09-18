<script setup lang="ts">
import {
  MessageDialogType,
  MessageDialogActionButton,
  MessageDialogActionButtonHandler,
  MessageDialogAbortHandler,
  MessageDialogShowParam,
} from "@/common/front/messagedialog/MessageDialogTypes";
import { MessageDialogAbortError } from "@/common/front/messagedialog/MessageDialogAbortError";
import MessageDialogActionButtonView from "@/common/front/messagedialog/MessageDialogActionButtonView.vue";
import useMessageDialog from "@/composables/useMessageDialog";

const inert = useInert()
const messageDialog = useMessageDialog();

const visible = ref(false);

const title = ref("");
const titleType = ref<MessageDialogType>("is-primary");
const message = ref("");
const titleClass = computed(() => [titleType.value]);
let actionButtonHandler: MessageDialogActionButtonHandler = () => {
  //noop
};
let abortHandler: MessageDialogAbortHandler = () => {
  //noop
};

const actionButtons = ref<MessageDialogActionButton[]>([]);

//-------------------------

onMounted(() => {
  // メッセージのコントローラーにこのダイアログが操作対象であることを伝える
  messageDialog.replaceHandle({
    show,
    abort(error) {
      abortHandler(error);
      cleanup();
    },
  });
});

onBeforeUnmount(() => {
  // 開いた状態(つまりcleanupが実行される前)でunmountされたときはエラーが実行されるようにしておく
  // 通常時はcleanupが実行されてからなのでabortHandlerは何もしない関数になっている
  abortHandler(new MessageDialogAbortError());
});

/**
 * 表示
 * @param param  表示パラメータ
 */
function show(param: MessageDialogShowParam) {
  inert.messageDialog(true)
  visible.value = true;

  title.value = param.title;
  titleType.value = param.titleType;
  message.value = param.message;
  actionButtons.value = param.actionButtons;
  actionButtonHandler = param.actionButtonHandler;
  abortHandler = param.abortHandler;
}

/**
 * クリーンアップ
 */
function cleanup() {
  inert.messageDialog(false)
  visible.value = false;
  actionButtonHandler = () => {
    //noop;
  };
  abortHandler = () => {
    //noop;
  };
}

/**
 * ボタンクリック時
 * @param buttonOrder クリックされたボタンの位置
 */
function clickedActionButtons(buttonOrder: number) {
  actionButtonHandler(buttonOrder);
  cleanup();
}
</script>

<template>
  <div class="modal is-active" v-if="visible">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head py-3" :class="titleClass">
        <p class="modal-card-title">{{ title }}</p>
      </header>
      <section class="modal-card-body">
        <span style="white-space: pre-wrap">{{ message }}</span>
      </section>
      <footer class="modal-card-foot py-3 is-justify-content-flex-end">
        <template
          v-for="(actionButton, index) of actionButtons"
          :key="actionButton.text"
        >
          <MessageDialogActionButtonView
            :button-type="actionButton.buttonType"
            :text="actionButton.text"
            :outline="actionButton.outline"
            @click="clickedActionButtons(index)"
          />
        </template>
      </footer>
    </div>
  </div>
</template>
