<script setup lang="ts">
const loading = useLoading();
const messageDialog = useMessageDialog();

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
  </div>
</template>
