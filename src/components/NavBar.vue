<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const router = useRouter()
const { user } = storeToRefs(authStore)
let signOut = () => {
  authStore.signOut(router)
}
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <RouterLink to="/" active-class="active" class="navbar-brand">WorkTracker</RouterLink>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav">
                <RouterLink to="/work-report" active-class="active" class="nav-item nav-link"
                  >WriteReport</RouterLink
                >
                <RouterLink to="/work-history" active-class="active" class="nav-item nav-link"
                  >History</RouterLink
                >
                <RouterLink
                  to="/admin"
                  active-class="active"
                  class="nav-item nav-link"
                  v-if="user.isAdmin"
                  >Administration</RouterLink
                >
              </div>
              <div class="navbar-nav ms-auto">
                <RouterLink to="/profile" active-class="active" class="nav-item nav-link"
                  >profile</RouterLink
                >
                <button class="nav-item nav-link" @click="signOut">SignOut</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div>
      <section>
        <slot></slot>
      </section>
    </div>
  </div>
</template>
