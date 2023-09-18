<script setup lang="ts">
type User = {
  userId: string;
  firstName: string;
  familyName: string;
};

const loading = useLoading();

const familyName = ref("");
const firstName = ref("");

const users = ref<User[]>([]);

async function search() {
  loading.show();
  try {
    const r = await $fetch("/api/user/userList/search", {
      method: "GET",
      query: {
        familyName: familyName.value,
        firstName: firstName.value,
      },
    });
    // 雑
    users.value = r as any;
  } finally {
    loading.hide();
  }
}

async function edit(user: User) {
  await navigateTo({ path: "/user/userEdit", query: { userId: user.userId } });
}
</script>
<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">ユーザー一覧</p>
      </div>
    </section>

    <div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">姓</label>
            <div class="control">
              <input class="input" type="text" v-model="familyName" />
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">名</label>
            <div class="control">
              <input class="input" type="text" v-model="firstName" />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <button class="button is-primary" @click="search">検索</button>
        </p>
      </div>
    </div>

    <div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>姓</th>
            <th>名</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user of users" :key="user.userId">
            <tr>
              <td>{{ user.familyName }}</td>
              <td>{{ user.firstName }}</td>
              <td>
                <button class="button is-primary" @click="edit(user)">編集</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
