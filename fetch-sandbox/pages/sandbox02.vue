<script setup lang="ts">
import { FetchError } from "ofetch";
useHead({
  title: "sandbox02",
});

type HandleFetchResponse = {
  sandbox02Result: {
    hello: string;
  };
};

const status = ref("200");
const statusList = ref(["200", "400", "403", "404"]);

function handleFetchError<T = any>(e: FetchError<T>) {
  console.log("-----handleFetchError----");
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
    const r = await $fetch<HandleFetchResponse>("/api/sandbox02/handleFetch", {
      method: "post",
      body: {
        status: status.value,
      },
      onRequest({ request, options }) {
        // await つきで呼ばれるのでPromiseを返すことができる
        // リクエストの加工をしたりログを残すときはここで

        console.log("-----onRequest----");
        // requestはfetchの第1引数
        console.log("request", request);
        // optionsはfetchの第2引数
        console.log("options", options);
      },
      onRequestError({ request, options, error }) {
        // await つきで呼ばれるのでPromiseを返すことができる
        // fetchを呼んだ時にエラーが発生するとこれが呼ばれる
        // リトライの前

        console.log("-----onRequest----");
        console.log("request", request);
        console.log("options", options);
        // errorはfetchのエラー
        console.log("error", error);
      },
      onResponse({ request, options, response }) {
        // await つきで呼ばれるのでPromiseを返すことができる
        // fetchでエラーが起きてないときはレスポンスのステータスに限らず必ず呼ばれる
        console.log("-----onResponse----");
        console.log("request", request);
        console.log("options", options);
        console.log("response", response);
      },
      onResponseError({ request, options, response }) {
        // await つきで呼ばれるのでPromiseを返すことができる
        // オプションのignoreResponseError がfalse(デフォルト)の状態で
        // HTTPステータスが400, 500番台の時に呼ばれる
        console.log("-----onResponseError----");
        console.log("request", request);
        console.log("options", options);
        console.log("response", response);
      },
    });

    console.log("success");
    console.log(r);
  } catch (_e) {
    // 例外の型はFetchErrorで受け取ることができる。
    const e = _e as FetchError<HandleFetchResponse>;
    handleFetchError(e);
  }
}
</script>

<template>
  <div>
    <h1>sandbox02</h1>

    <div>
      <select v-model="status">
        <template v-for="s of statusList" :key="s">
          <option :value="s">{{ s }}</option>
        </template>
      </select>

      <button @click="doFetch">doFetch</button>
    </div>

    <div>
      <h2>$fetchのコールバックについての動きを調べる</h2>
      コールバックはすべてawait付きで実行されるのでPromiseを返すことができる。

      <div>
        <h3>onRequest({ request, options })</h3>
        <p>fetchが実行される前に呼び出される。</p>
        <p>requestはofetchの第1引数(URL), optionsはofetchの第2引数が渡される</p>
        <p>
          optionを加工してヘッダーをつけたり、ログを残したりするのに使えそう
        </p>
      </div>

      <div>
        <h3>onRequestError({ request, options, error })</h3>
        <p>fetchでエラーが発生したときに呼び出される。</p>
        <p>リトライの実行前に呼び出される。</p>
      </div>

      <div>
        <h3>onResponse({ request, options, response })</h3>
        <p>fetchでエラーが発生しなかった時は必ず呼び出される。</p>
        <p>レスポンスの情報をストアに保存したりという時に使えそう</p>
      </div>

      <div>
        <h3>onResponseError({ request, options, response })</h3>
        <p>
          オプションのignoreResponseError がfalse(デフォルト)の状態で
          HTTPステータスが400, 500番台の時に呼ばれる
        </p>
      </div>
    </div>
    <hr/>
    <div>
      実際はラッパーを作ることになるので活用できるシーンは少ないかもしれないが
      ログ記録とかには使えるかもしれない
    </div>
  </div>
</template>
