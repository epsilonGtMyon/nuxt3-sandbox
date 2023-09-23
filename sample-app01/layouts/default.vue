<script setup lang="ts">
const inert = useInert();
</script>

<template>
  <Html class="has-navbar-fixed-top">
    <Body>
      <nav
        class="navbar is-primary is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
        :inert="inert.isInert"
      >
        <div class="navbar-brand">
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-start">
            <NuxtLink class="navbar-item" to="/">Home</NuxtLink>
            <NuxtLink class="navbar-item" to="/user/userList"
              >ユーザー一覧</NuxtLink
            >
            <NuxtLink class="navbar-item" to="/user/userEdit"
              >ユーザー登録</NuxtLink
            >
            <NuxtLink class="navbar-item" to="/apis/sandbox01"
              >sandbox01</NuxtLink
            >
            <NuxtLink class="navbar-item" to="/apis/sandbox02"
              >sandbox02</NuxtLink
            >
          </div>

          <div class="navbar-end">
            <div class="navbar-item"></div>
          </div>
        </div>
      </nav>
      <div :inert="inert.isInert">
        <slot>
          <NuxtPage />
        </slot>
      </div>
      <MessageDialog></MessageDialog>
      <Loading></Loading>
      <Toast></Toast>
    </Body>
  </Html>
</template>
