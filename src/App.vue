<script setup>
// import SignIn from './views/SignIn.vue'
// import SignUp from './views/SignUp.vue'

import NavBar from './components/NavBar.vue'
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
  <NavBar> </NavBar>
  <RouterView />
  <!-- <SignIn v-if="hasAccount" />
  <SignUp v-if="!hasAccount" /> -->
</template>

<style scoped></style>
