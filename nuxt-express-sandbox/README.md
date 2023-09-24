# nuxt-express-sandbox

nuxt3とexpressを組み合わせる

`nuxt.config.ts` の `serverHandlers` へ設定

```
export default defineNuxtConfig({
  serverHandlers: [
    { route: '/backend/**', handler: '~/backend/index.ts' }
  ]
})
```


`backend/index.ts` の設定

```
import express from "express";

const app = express();
const router = express.Router();
router.get("/hello", (req, res) => {
  res.send({
    value: "hello",
  });
});

// serverHandlersのrouteと合わせておく
app.use("/backend", router);

// appをそのままではなくfromNodeMiddlewareを通す
export default fromNodeMiddleware(app);
```