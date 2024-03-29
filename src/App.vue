<script setup>
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import DashBoard from './views/DashBoard.vue'
import NavBar from './components/NavBar.vue'

import { ref } from 'vue'
let hasAccount = ref(false)
</script>

<template>
  <NavBar><DashBoard /></NavBar>
  <!-- <SignIn v-if="hasAccount" />
  <SignUp v-if="!hasAccount" /> -->
</template>

<style scoped></style>
