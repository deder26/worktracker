<script setup>
import { useAuthStore } from '../store/authStore'
import WorkDetails from '../components/WorkDetails.vue'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template><WorkDetails :userId="user.id" /></template>

<style scoped></style>
