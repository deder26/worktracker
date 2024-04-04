<script setup>
// import SignIn from './views/SignIn.vue'
// import SignUp from './views/SignUp.vue'

import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'

import { inject } from 'vue'

const globalUser = inject('globalUser')
</script>

<template>
  <NavBar v-if="globalUser.isLogin"> </NavBar>
  <RouterView />
</template>

<style scoped></style>
