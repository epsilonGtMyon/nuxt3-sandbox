<script setup lang="ts">
import { computed } from "vue";
import { MessageDialogType } from "./MessageDialogTypes";
const props = withDefaults(
  defineProps<{
    text: string;
    buttonType: MessageDialogType;
    outline?: boolean;
  }>(),
  {
    outline: false,
  }
);

const buttonClass = computed(() => {
  const classes = ["button", props.buttonType];
  if (props.outline) {
    classes.push("is-outlined");
  }
  return classes;
});
</script>

<template>
  <button :class="buttonClass" v-bind="$attrs">
    {{ props.text }}
  </button>
</template>
