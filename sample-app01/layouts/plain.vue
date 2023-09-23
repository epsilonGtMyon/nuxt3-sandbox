<script setup lang="ts">
const inert = useInert();
</script>

<template>
  <Html>
    <Body>
      <div :inert="inert.isInert" style="height: 100%">
        <slot>
          <NuxtPage />
        </slot>
      </div>
      <MessageDialog></MessageDialog>
      <Loading></Loading>
      <Toast></Toast>
    </Body>
  </Html>
</template>


<style scoped lang="scss">
</style>