<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const authStore = useAuthStore()
let router = useRouter()
let userLogin = ref({
  name: '',
  email: '',
  password: ''
})
let validationError = ref({
  showErr: false,
  errMsg: ''
})

let signUpUser = async () => {
  try {
    if (
      userLogin.value.name !== '' &&
      userLogin.value.email !== '' &&
      userLogin.value.password !== ''
    ) {
      await authStore.registerUser(router, userLogin.value)
    } else {
      throw new Error('Fill all the above input field')
    }
  } catch (error) {
    validationError.value.showErr = true
    validationError.value.errMsg = error.message
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
                <h2 class="fw-bold mb-2 text-uppercase">SignUp</h2>

                <div class="form-outline-secondary mb-4">
                  <input
                    v-model="userLogin.name"
                    type="text"
                    id="name"
                    name="name"
                    class="form-control form-control-lg border border-3"
                    placeholder="Name"
                  />
                </div>
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
                <div class="form-outline mb-4" v-if="validationError.showErr">
                  <p class="text-danger">{{ validationError.errMsg }}</p>
                </div>
                <button class="btn btn-primary btn-lg px-5" type="button" @click="signUpUser">
                  SignUp
                </button>
              </div>

              <div>
                <p class="mb-0">
                  Already have an account?
                  <RouterLink to="/sign-in" class="text-black-50 fw-bold">SignIn</RouterLink>
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
