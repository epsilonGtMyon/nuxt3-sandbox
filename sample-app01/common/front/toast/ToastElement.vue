<script setup lang="ts">
import { ToastType } from "./ToastTypes";

const props = defineProps<{
  /** ID */
  id: string;

  /** トーストの種類 */
  toastType: ToastType;

  /** メッセージ*/
  message: string;
}>();

const emit = defineEmits<{
  /** トーストを閉じる*/
  close: [id: string]
}>() 

const toastClass = computed(() => {
  const classes = [];

  switch (props.toastType) {
    case "info": {
      classes.push("is-info");
      break;
    }
    case "warn": {
      classes.push("is-warning");
      break;
    }
    case "error": {
      classes.push("is-danger");
      break;
    }
  }

  return classes;
});

function close() {
  emit('close', props.id)
}
</script>

<template>
  <div class="notification" :class="toastClass">
    <button class="delete" @click="close"></button>
    {{ message }}
  </div>
</template>
