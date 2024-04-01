<script setup>
import { ref } from 'vue'

let userLogin = ref({
  email: '',
  password: ''
})

let loginUser = () => {
  console.log(userLogin.value)
  if (userLogin.value.email !== '' && userLogin.value.password !== '') {
    console.log(userLogin.value)
    alert('Login Button Clicked')
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
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>

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

                <button class="btn btn-primary btn-lg px-5" type="button" @click="loginUser">
                  Login
                </button>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <a href="#!" class="text-black-50 fw-bold">Sign Up</a>
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
