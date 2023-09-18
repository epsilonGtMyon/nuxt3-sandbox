<script setup lang="ts">
const value01 = ref("")


async function helloGet() {
  const r = await $fetch("/api/helloGet", {
    method: "GET",
    query: {
      value01: value01.value,
    },
    async onRequest(context) {
      console.log("onRequest", context);
    },
  });
  console.log(r);
}

async function helloPost() {
  const r = await $fetch("/api/helloPost", {
    method: "POST",
    body: {
      value01: value01.value,
    }
  })
}
</script>

<template>
  <div>
    <div>
      <label>
        value01:
        <input v-model="value01"/>
      </label>
    </div>
    <div>
      <button @click="helloGet" class="button is-primary">helloGet</button>
      <button @click="helloPost" class="button is-primary">helloPost</button>
    </div>
  </div>
</template>
