<script setup>
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import DashBoard from './views/DashBoard.vue'
import WorkReport from './views/WorkReport.vue'
import NavBar from './components/NavBar.vue'

import { ref } from 'vue'
let hasAccount = ref(false)
</script>

<template>
  <NavBar>
    <!-- <DashBoard /> -->
    <WorkReport />
  </NavBar>
  <!-- <SignIn v-if="hasAccount" />
  <SignUp v-if="!hasAccount" /> -->
</template>

<style scoped></style>
