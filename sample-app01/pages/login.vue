<script setup lang="ts">
definePageMeta({ layout: "plain" });

const auth = useAuthentication();

async function login() {
  auth.auth(true);

  await navigateTo("/")
}
</script>

<template>
  <div class="loginPage">
    <div class="loginPage-form box">
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">User</label>
          <div class="control">
            <input class="input" type="text" />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="********" />
          </div>
        </div>

        <button class="button is-primary" >Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loginPage {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.loginPage-form {
  min-width: 460px;
}
</style>
