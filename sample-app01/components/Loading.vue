<script setup lang="ts">
const loading = useLoading();
</script>
<template>
  <div class="loading" v-if="loading.visible">
    <div class="loading-loadingMark" tabindex="0"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: wait;

  z-index: 32;

  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-loadingMark {
  height: 100px;
  width: 100px;
  border-radius: 70px;
  background-color: rgba(255, 255, 255);

  animation: scaleout 0.5s linear infinite;
}
</style>
