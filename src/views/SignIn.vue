<script setup>
import { ref, inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import authSerVices from '../services/authServices.js'
let userLogin = ref({
  email: '',
  password: '',
  error: false,
  msg: ''
})
const router = useRouter()

let user = inject('globalUser')

let loginUser = async () => {
  try {
    let data = await authSerVices.signIn(userLogin.value)

    console.log('user_data', data)
    if (data) {
      user.value = {
        id: data.id,
        token: 'hgvbngjhbjknkbjhbbbkn',
        isLogin: true,
        isAdmin: data.role === 'admin' ? true : false
      }
      router.push('/')
    } else {
      userLogin.value.error = true
      userLogin.value.msg = 'Incorrect user email or password'
    }
  } catch (error) {
    console.error(error)
    userLogin.value.msg = 'Server Error'
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
