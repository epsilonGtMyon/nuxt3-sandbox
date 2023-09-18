import { defineStore } from "pinia";

export default defineStore("inert", () => {
  const loading = useLoading();
  const messageDialogVisible = ref(false)


  const isInert = computed(() => {
    return messageDialogVisible.value || loading.visible;
  });

  function messageDialog(visible: boolean) {
    messageDialogVisible.value = visible
  }

  return {
    isInert,
    messageDialog,
  };
});
