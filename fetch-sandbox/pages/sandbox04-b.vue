<script setup lang="ts">
import { FetchError } from "ofetch";
useHead({
  title: "sandbox04-b",
});

type HandleFetchResponse = {
  sandbox04Result: {
    hello: string;
  };
};

const route = useRoute();
const status = (route.query.status as string) ?? "";

const aData = await useAsyncData(`sandbox04-b-${status}`, async () => {
  const r = await $fetch.raw<HandleFetchResponse>(
    "/api/sandbox04/handleFetch",
    {
      method: "get",
      query: {
        status,
      },
    }
  );

  console.log(r)

  return r._data;
});
console.log(aData);
console.log(aData.data.value);
console.log(aData.error.value);
</script>

<template>
  <div>
    <h1>sandbox04</h1>

    <div>
      <h2>useAsyncDataを試す。</h2>

      <div>
        CSR, SSRともにuseAsyncDataの内部でエラーが起きたときはスローされるのではなくerrorにエラーのインスタンスが入っている。

      </div>
    </div>
  </div>
</template>
