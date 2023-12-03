<script setup lang="ts">
import { FetchError } from "ofetch";
useHead({
  title: "sandbox03",
});

const redirect = ref<RequestRedirect>("follow");

async function doFetch() {
  try {
    const r = await $fetch.raw("/api/sandbox03/handleFetch", {
      method: "post",
      redirect: redirect.value,
    });

    console.log("success");
    console.dir(r)
    console.log("response", r);
    console.log("response.headers", Array.from(r!.headers.entries()));
  } catch (_e) {
    // 例外の型はFetchErrorで受け取ることができる。
    const e = _e as FetchError;
    console.dir(e);
  }
}
</script>

<template>
  <div>
    <h1>sandbox03</h1>
    <div>
      <label>
        <input type="radio" v-model="redirect" value="follow" />
        follow
      </label>
      <label>
        <input type="radio" v-model="redirect" value="error" />
        error
      </label>
      <label>
        <input type="radio" v-model="redirect" value="manual" />
        manual
      </label>
    </div>

    <div>
      <button @click="doFetch">doFetch</button>
    </div>

    <div>
      <h2>$fetchのredirectについて調べる</h2>

      <div>
        <p>
          fetch APIのredirectにそのまま渡してそうだが、リダイレクト先とかが取れないので対応できなさそう...
        </p>
      </div>
    </div>
  </div>
</template>
