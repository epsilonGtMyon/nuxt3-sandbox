<script setup lang="ts">
useHead({
  title: "sandbox04",
});

const status = ref("200");
const statusList = ref(["200", "400", "403", "404"]);

function move() {
  navigateTo({
    path: "/sandbox04-b",
    query: {
      status: status.value,
    },
  });
}
</script>

<template>
  <div>
    <h1>sandbox04</h1>

    <div>
      <select v-model="status">
        <template v-for="s of statusList" :key="s">
          <option :value="s">{{ s }}</option>
        </template>
      </select>

      <button @click="move">move</button>
    </div>
  </div>
</template>
