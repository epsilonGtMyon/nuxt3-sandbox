<script setup lang="ts">
import { FetchError } from "ofetch";
useHead({
  title: "sandbox01",
});

type HandleFetchResponse = {
  sandbox01Result: {
    hello: string;
  };
};

const status = ref("200");
const statusList = ref(["200", "400", "403", "404"]);

function handleFetchError<T = any>(e: FetchError<T>) {
  // レスポンスのbody
  console.log(e.data);

  // レスポンス
  console.log("response", e.response);

  // ヘッダーの一覧
  console.log("response.headers", [...e.response!.headers.entries()]);

  console.log("status", e.status);
  console.log("statusText", e.statusText);
  console.log("statusCode", e.statusCode);
  console.log("statusMessage", e.statusMessage);
}

async function doFetch() {
  try {
    const r = await $fetch<HandleFetchResponse>("/api/sandbox01/handleFetch", {
      method: "post",
      body: {
        status: status.value,
      },
    });

    console.log(r);
  } catch (_e) {
    // 例外の型はFetchErrorで受け取ることができる。
    const e = _e as FetchError<HandleFetchResponse>;
    handleFetchError(e);
  }
}

async function doFetchRaw() {
  try {
    const r = await $fetch.raw<HandleFetchResponse>(
      "/api/sandbox01/handleFetch",
      {
        method: "post",
        body: {
          status: status.value,
        },
      }
    );

    console.log(r);
    console.log("data", r._data)
    console.log("headers", [...r.headers.entries()])
  } catch (_e) {
    // 例外の型はFetchErrorで受け取ることができる。
    const e = _e as FetchError<HandleFetchResponse>;
    handleFetchError(e);
  }
}
</script>

<template>
  <div>
    <h1>sandbox01</h1>

    <div>
      <select v-model="status">
        <template v-for="s of statusList" :key="s">
          <option :value="s">{{ s }}</option>
        </template>
      </select>

      <button @click="doFetch">doFetch</button>
      <button @click="doFetchRaw">doFetchRaw</button>
    </div>


    <div>
      <h2>$fetchの基本的な動きを見る</h2>
      <pre>const r = await $fetch("/xxx", {..})</pre>
      <p>
        でrにボディの情報が入ってくる
      </p>
      
      <pre>
try {
  const r = await $fetch("/xxx", {..})
} catch(_e) {
  const e = _e as FetchError;
}</pre>
      <p>
        で例外発生時はFetchErrorという型で受けれる。
      </p>
    </div>

    <div>
      <h2>$fetchの正常時のレスポンスの情報を得る</h2>
      <p>
        異常時はFetchErrorでレスポンスのヘッダなどにアクセスできるが正常時はボディしか受けれない
      </p>
      <pre>
const r = await $fetch.raw("/xxx", {..})
const data = r._data
</pre>
      <p>
        と<code>$fetch.raw</code>とすることでレスポンス全体を受け取れる
      </p>
    </div>
  </div>
</template>
