import { defineStore } from "pinia";

export default defineStore("loading", () => {
  const loadingCount = ref(0);

  const visible = computed(() => loadingCount.value > 0);

  function show() {
    loadingCount.value++;
  }
  function hide() {
    if (loadingCount.value > 0) {
      loadingCount.value--;
    }
  }

  return {
    visible,
    show,
    hide,
  };
});
