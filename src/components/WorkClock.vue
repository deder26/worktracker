<template>
  <div class="d-flex justify-content-center">
    <div class="clock">
      <h2>{{ time }}</h2>
      <div class="checkin d-flex justify-content-center">
        <div class="checkin d-flex flex-column justify-content-center align-items-center">
          <div v-if="!workTimeLog.isStart" class="mt-2">
            <button class="btn btn-primary btn-lg active" @click="workStarted">start</button>
          </div>
          <div v-if="workTimeLog.isStart && !workTimeLog.isBreak" class="mt-2">
            <button class="btn btn-primary btn-lg active" @click="breakStarted">break</button>
            <button class="btn btn-primary btn-lg active" @click="workEnded">checkout</button>
          </div>
          <div v-if="workTimeLog.isBreak" class="mt-2">
            <button class="btn btn-primary btn-lg active">re-start</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
let time = ref('00:00:00')
let workTimeLog = ref({
  isStart: false,
  isBreak: false,
  start_time: null,
  end_time: null,
  break_start_time: null,
  break_end_time: null
})

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

function getCurrentDateTime() {
  const now = new Date()

  // Get the year, month, and day
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  // Get the hours, minutes, and seconds
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  // Concatenate the date and time parts with the desired format
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return dateTimeString
}

let checkTime = (i) => {
  if (i < 10) {
    i = '0' + i
  } // add zero in front of numbers < 10
  return i
}

onMounted(() => {
  fetchWorkClockLog()
  startTime()
})

let user_id = 1
let today = '2024-03-31'
let fetchWorkClockLog = async () => {
  await axios
    .get('/data/work_time_log.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      let data = response.data

      let userData = data.filter(
        (record) => record.user_id == user_id && record.created_at >= today
      )
      if (userData) {
        workTimeLog.value.isStart = userData[0].isStart
        workTimeLog.value.isBreak = userData[0].isBreak
        workTimeLog.value.start_time = userData[0].start_time
        workTimeLog.value.end_time = userData[0].end_time
        workTimeLog.value.break_start_time = userData[0].break_start_time
        workTimeLog.value.break_end_time = userData[0].break_end_time
      }
      console.log(userData)
      console.log(workTimeLog.value)
    })
    .catch(function (error) {
      console.error(error)
    })
}

let workStarted = () => {
  workTimeLog.value.isStart = true
  workTimeLog.value.start_time = getCurrentDateTime()
}
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
