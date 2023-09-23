<script setup lang="ts">
import { ToastElementRecord } from "~/common/front/toast/ToastTypes";
import ToastElement from "~/common/front/toast/ToastElement.vue";

const toasts = ref<ToastElementRecord[]>([]);

const { toast } = useToast();

function stopTimer(toast: ToastElementRecord) {
  if (toast.timerId >= 0) {
    clearTimeout(toast.timerId);
  }
}

function removeToast(id: ToastElementRecord["id"]) {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index < 0) {
    return;
  }

  toasts.value.splice(index, 1);
}

toast.replaceHandle({
  show(param) {
    const id = `toast-${String(Math.random())}`;

    let timerId = -1;
    if (param.duration >= 0) {
      timerId = window.setTimeout(() => {
        removeToast(id);
      }, param.duration);
    }
    
    toasts.value.push({
      ...param,
      id,
      timerId,
    });
  },
  closeAll() {
    toasts.value.forEach((t) => {
      stopTimer(t);
    });
    toasts.value = [];
  },
  closeScope(scope) {
    const leftToasts: ToastElementRecord[] = [];
    const removedToasts: ToastElementRecord[] = [];

    toasts.value.forEach((t) => {
      if (t.scope !== scope || !t.closeOnScopeDestroyed) {
        leftToasts.push(t);
        return;
      }
      removedToasts.push(t);
    });

    toasts.value = leftToasts;
    removedToasts.forEach((t) => stopTimer(t));
  },
});

function close(id: string) {
  removeToast(id);
}
</script>

<template>
  <div class="toast">
    <div>
      <template v-for="t of toasts">
        <ToastElement
          :id="t.id"
          :toastType="t.toastType"
          :message="t.message"
          @close="close"
        ></ToastElement>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  inset: 40px;

  display: flex;
  justify-content: flex-end;
  z-index: 31;

  pointer-events: none;
}
</style>
