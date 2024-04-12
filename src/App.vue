<script setup>
import NavBar from './components/NavBar.vue'
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './store/authStore'

import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
onBeforeMount(() => {
  authStore.getAllUsers()
})
</script>

<template>
  <NavBar v-if="user.isLogin"> </NavBar>
  <RouterView />
</template>

<style scoped></style>
