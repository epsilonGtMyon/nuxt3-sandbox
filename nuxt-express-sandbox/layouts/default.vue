<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> | 
    <NuxtLink to="/sandbox01">Sandbox01</NuxtLink>
  </div>
  <div>
    <slot>
      <NuxtPage />
    </slot>
  </div>
</template>
