<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const authStore = useAuthStore()
const router = useRouter()
let userLogin = ref({
  email: '',
  password: '',
  error: false,
  msg: ''
})

let loginUser = async () => {
  try {
    if (userLogin.value.email !== '' && userLogin.value.password !== '') {
      await authStore.signIn(router, userLogin.value.email, userLogin.value.password)
    } else {
      throw new Error('Email and Pass cant be empty')
    }
  } catch (error) {
    userLogin.value.error = true
    userLogin.value.msg = error.message
  }
}
</script>

<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Sign Up</h2>

                <div class="form-outline-secondary mb-4">
                  <input
                    v-model="userLogin.email"
                    type="email"
                    id="email"
                    name="email"
                    class="form-control form-control-lg border border-3"
                    placeholder="Email"
                  />
                </div>

                <div class="form-outline mb-4">
                  <input
                    v-model="userLogin.password"
                    type="password"
                    id="password"
                    name="password"
                    class="form-control form-control-lg border border-3"
                    placeholder="Password"
                  />
                </div>

                <div class="form-outline mb-4" v-if="userLogin.error">
                  <p class="text-danger">{{ userLogin.msg }}</p>
                </div>

                <button class="btn btn-primary btn-lg px-5" type="button" @click="loginUser">
                  Login
                </button>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <RouterLink to="/sign-up" class="text-black-50 fw-bold">Sign Up</RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
