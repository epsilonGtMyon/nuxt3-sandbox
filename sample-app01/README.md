# sample-app01

nuxt3のサンプル

## 準備

`pinia` 使うときに失敗することがあるので`package.json` に設定

```
  "overrides": {
    "vue": "latest"
  }
```


## インストール

```
npm install bulma pinia @pinia/nuxt @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
npm install -D sass
```

## メモ

レイアウト [components](https://nuxt.com/docs/getting-started/seo-meta#components)

scssの取り込みだったりpiniaの有効化

```
export default defineNuxtConfig({
  css: ["@/assets/main.scss"],
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
})
```

