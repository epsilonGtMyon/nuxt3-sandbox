<script setup lang="ts">
const value01 = ref("hello");
const text = ref("");

async function executGet() {
  text.value = "";

  const param = {
    value01: value01.value,
  };

  const r = await $fetch("/backend/sandbox01/executeGet", {
    method: "GET",
    query: param,
  });
  text.value = JSON.stringify(r);
}



async function executPost() {
  text.value = "";

  const param = {
    value01: value01.value,
  };

  const r = await $fetch("/backend/sandbox01/executePost", {
    method: "POST",
    body: param,
  });
  text.value = JSON.stringify(r);
}
</script>

<template>
  <div>
    <h1>sandbox01</h1>

    <div>
      <button @click="executGet">get</button>
      <button @click="executPost">post</button>
    </div>

    <div>
      <div>
        <label>value01:
          <input type="text" v-model="value01" />
        </label>
      </div>

      <textarea v-model="text"></textarea>
    </div>
  </div>
</template>
