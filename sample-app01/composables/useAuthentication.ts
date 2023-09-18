import { defineStore } from "pinia";

export default defineStore(
  "authentication",
  () => {
    const authenticated = ref(false);

    function auth(value: boolean) {
      authenticated.value = value;
    }

    return {
      authenticated: readonly(authenticated),
      auth,
    };
  },
  {
    persist: true
  }
);
