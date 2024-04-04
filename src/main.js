import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useLocalStorage } from './composables/useLocalStorage.js'

const app = createApp(App)
let userInfo = {
  id: '',
  token: '',
  isLogin: false,
  isAdmin: false
}
let user = useLocalStorage('userInfo', userInfo)
app.provide('globalUser', user)
app.component('VueDatePicker', VueDatePicker)

app.use(router).mount('#app')
