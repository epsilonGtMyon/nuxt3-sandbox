<script setup lang="ts">
const route = useRoute();
const loading = useLoading();
const messageDialog = useMessageDialog();

const familyName = ref("");
const firstName = ref("");

const query = route.query;
const userId = (query.userId || "") as string;
const isEdit = ref(userId !== "");

if (isEdit.value) {
  const d = await useFetch("/api/user/userEdit/find", {
    method: "GET",
    query: {
      userId,
    },
  });

  // このあたりのハンドリングをきっちりする
  const dd = d.data.value as any;
  familyName.value = dd.familyName;
  firstName.value = dd.firstName;
}

async function register() {
  const r = await messageDialog.confirm("登録しますか？");
  if (!r) {
    return;
  }

  const param = {
    userId: userId,
    familyName: familyName.value,
    firstName: firstName.value,
  };

  try {
    loading.show();
    await $fetch("/api/user/userEdit/register", {
      method: "POST",
      body: param,
    });

    // モーダル出しすぎるのはよくないがとりあえず
    await messageDialog.info("登録しました。");
    await navigateTo("/user/userList");
  } finally {
    loading.hide();
  }
}
async function cancel() {
  await navigateTo("/user/userList");
}

async function remove() {
  const r = await messageDialog.confirm("削除しますか？");
  if (!r) {
    return;
  }

  const param = {
    userId,
  };

  try {
    loading.show();
    await $fetch("/api/user/userEdit/remove", {
      method: "POST",
      body: param,
    });

    // モーダル出しすぎるのはよくないがとりあえず
    await messageDialog.info("削除しました。");
    await navigateTo("/user/userList");
  } finally {
    loading.hide();
  }
}
</script>
<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">ユーザー登録</p>
        <p class="subtitle">ユーザー情報を入力してください。</p>
      </div>
    </section>
    <div class="field">
      <label class="label">姓</label>
      <div class="control">
        <input class="input" type="text" v-model="familyName" />
      </div>
    </div>

    <div class="field">
      <label class="label">名</label>
      <div class="control">
        <input class="input" type="text" v-model="firstName" />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <p class="control">
        <button class="button is-primary" @click="register">登録</button>
      </p>
      <template v-if="isEdit">
        <p class="control">
          <a class="button" @click="cancel"> キャンセル </a>
        </p>
        <p class="control">
          <a class="button is-danger" @click="remove"> 削除 </a>
        </p>
      </template>
    </div>
  </div>
</template>
