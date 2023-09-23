<script setup lang="ts">
const loading = useLoading();
const messageDialog = useMessageDialog();
const { toastHelper } = useToast();

function showLoading() {
  loading.show();
  setTimeout(() => {
    loading.hide();
  }, 3000);
}

async function showInfo() {
  await messageDialog.info("Info1");
  await messageDialog.info("Info2");
}

async function showConfirm() {
  const r = await messageDialog.confirm("XXXXXしますか");
  if (r) {
    await messageDialog.info("OK");
  } else {
    await messageDialog.error("Cancel");
  }
}

async function showError() {
  const r = await messageDialog.error(`えらーです
えらーです！！`);
}

function toastInfo(closeOnScopeDestroyed: boolean) {
  const message = `やっほー: ${closeOnScopeDestroyed ? "消す" : "残る"}`;
  toastHelper.info(message, closeOnScopeDestroyed);
}
function toastWarn(closeOnScopeDestroyed: boolean) {
  const message = `やっほー: ${closeOnScopeDestroyed ? "消す" : "残る"}`;
  toastHelper.warn(message, closeOnScopeDestroyed);
}
function toastError(closeOnScopeDestroyed: boolean) {
  const message = `やっほー: ${closeOnScopeDestroyed ? "消す" : "残る"}`;
  toastHelper.error(message, closeOnScopeDestroyed);
}
function toastClear() {
  toastHelper.closeAll();
}
</script>

<template>
  <div>
    <div>
      <button @click="showLoading" class="button is-primary">
        showLoading
      </button>
    </div>
    <div>
      <button @click="showInfo" class="button is-primary">Info</button>
      <button @click="showConfirm" class="button is-info">Confirm</button>
      <button @click="showError" class="button is-danger">Error</button>
    </div>

    <div>
      <div>
        <button @click="toastInfo(true)" class="button is-info">
          Toast Info
        </button>
        <button @click="toastWarn(true)" class="button is-warning">
          Toast Warn
        </button>
        <button @click="toastError(true)" class="button is-danger">
          Toast Error
        </button>
      </div>
      <div>
        <button @click="toastInfo(false)" class="button is-info">
          Toast Info
        </button>
        <button @click="toastWarn(false)" class="button is-warning">
          Toast Warn
        </button>
        <button @click="toastError(false)" class="button is-danger">
          Toast Error
        </button>
      </div>
      <div>
        <button @click="toastClear" class="button is-dark">Toast Clear</button>
      </div>
    </div>
  </div>
</template>
