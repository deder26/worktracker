import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { createPinia } from 'pinia'
const app = createApp(App)
const pinia = createPinia()
app.component('VueDatePicker', VueDatePicker)
app.use(pinia)
app.use(router).mount('#app')
