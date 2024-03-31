<template>
  <div class="d-flex justify-content-center">
    <div class="clock">
      <h2>{{ time }}</h2>
      <div class="checkin d-flex justify-content-center">
        <div class="checkin d-flex flex-column justify-content-center align-items-center">
          <div v-if="!workTimeLog.isStart && !workTimeLog.isEnded" class="mt-2">
            <button class="btn btn-primary btn-lg active" @click="workStarted">start</button>
          </div>
          <div
            v-if="workTimeLog.isStart && !workTimeLog.isBreak && !workTimeLog.isEnded"
            class="mt-2"
          >
            <button class="btn btn-primary btn-lg active" @click="breakStarted">break</button>
            <button class="btn btn-primary btn-lg active" @click="workEnded">checkout</button>
          </div>
          <div v-if="workTimeLog.isStart && workTimeLog.isBreak" class="mt-2">
            <button class="btn btn-primary btn-lg active" @click="breakEnd">break-end</button>
          </div>

          <div v-if="workTimeLog.isEnded" class="mt-2">
            <h4>Thanks for you hard work today.</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentDateTime, getCurrentTime } from '../shared/dateAndTime.js'
import { ref, onMounted } from 'vue'
import axios from 'axios'
let time = ref('00:00:00')
let workTimeLog = ref({
  isStart: false,
  isBreak: false,
  isEnded: false,
  start_time: null,
  end_time: null,
  break_start_time: null,
  break_end_time: null
})

let startTime = () => {
  time.value = getCurrentTime()
  setTimeout(startTime, 1000)
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
        workTimeLog.value.isEnded = userData[0].isEnded
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

let breakStarted = () => {
  workTimeLog.value.isBreak = true
  workTimeLog.value.break_start_time = getCurrentDateTime()
}

let workEnded = () => {
  workTimeLog.value.isEnded = true
  workTimeLog.value.end_time = getCurrentDateTime()
}

let breakEnd = () => {
  workTimeLog.value.isBreak = false
  workTimeLog.value.break_end_time = getCurrentDateTime()
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
