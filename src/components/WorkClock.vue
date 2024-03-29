<template>
  <div class="d-flex justify-content-center">
    <div class="clock">
      <h2>{{ time }}</h2>
      <div class="checkin d-flex justify-content-center">
        <div class="checkin d-flex flex-column">
          <div><button class="btn btn-primary btn-lg active">start</button></div>
          <div>
            <button class="btn btn-primary btn-lg active">break</button>
            <button class="btn btn-primary btn-lg active">checkout</button>
          </div>
          <div>
            <button class="btn btn-primary btn-lg active">re-start</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
let time = ref('00:00:00')
let startTime = () => {
  const today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  m = checkTime(m)
  s = checkTime(s)
  time.value = h + ':' + m + ':' + s
  setTimeout(startTime, 1000)
}

let checkTime = (i) => {
  if (i < 10) {
    i = '0' + i
  } // add zero in front of numbers < 10
  return i
}

onMounted(() => {
  startTime()
})
</script>

<style scoped>
.clock {
  margin: 20px;
}
.clock h2 {
  font-size: 80px;
  font-weight: bold;
}
</style>
