<script setup>
import { ref, onBeforeMount, defineProps } from 'vue'
import axios from 'axios'
import { getAllDaysOfMonth } from '../shared/dateAndTime.js'

const { userId, actionHide } = defineProps(['userId', 'actionHide'])
console.log('userId', userId)
const daysOfMonth = ref([])
const workHistoryData = ref([])
const isReadOnly = ref(false)
console.log(actionHide)
const isActionHide = ref(actionHide ? actionHide : true)
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()
const currentYearAndMonth = ref({
  month: currentMonth,
  year: currentYear
})

const reports = ref([])

onBeforeMount(() => {
  fetchReports()
})
const datePicker = ref(null)

const displayData = () => {
  let data = []
  daysOfMonth.value.forEach((value) => {
    let date = value.date2
    let record = {
      date: value.date,
      startTime: null,
      totalBreakTime: null,
      endTime: null,
      totalWorkedTime: null,
      report: ''
    }

    let filteredReport = reports.value.filter((report) => {
      return report.date == date
    })
    if (filteredReport.length > 0) {
      record = {
        date: value.date,
        startTime: filteredReport[0].start_time,
        totalBreakTime: filteredReport[0].total_break_time,
        endTime: filteredReport[0].end_time,
        totalWorkedTime: filteredReport[0].total_worked_time,
        report: filteredReport[0].report
      }
    }
    data.push(record)
  })
  workHistoryData.value = data
}
const fetchReports = async () => {
  const allDaysOfMonth = getAllDaysOfMonth(
    currentYearAndMonth.value.year,
    currentYearAndMonth.value.month + 1
  )
  daysOfMonth.value = allDaysOfMonth

  try {
    let response = await axios.get('/data/work_history.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      const formattedMonth = String(currentYearAndMonth.value.month + 1).padStart(2, '0')
      const formattedDate = `${currentYearAndMonth.value.year}-${formattedMonth}`
      let data = response.data.filter(
        (record) => record.date.startsWith(formattedDate) && record.user_id == userId
      )

      reports.value = data
      displayData()
    }
  } catch (error) {
    console.error(error)
    throw new Error('error')
  }
}
</script>

<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
    <h2 class="m-4">Work History</h2>
    <div class="datepciker mt-4">
      <VueDatePicker
        v-model="currentYearAndMonth"
        @update:model-value="fetchReports"
        ref="datePicker"
        month-picker
      >
      </VueDatePicker>
    </div>
    <div class="time-details m-3">
      <p>total worked: 15hr 00min</p>
    </div>
    <div class="w-75 text-center mt-2 tbodyDiv">
      <table class="table table-striped border border-1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Report</th>
            <th v-if="!isActionHide">action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in workHistoryData" :key="day.id">
            <td>{{ day.date }}</td>
            <td>
              <div>
                <div>
                  <p>started at: {{ day.startTime }}</p>
                  <p>Ended at: {{ day.endTime }}</p>
                  <p>total break taken: {{ day.totalBreakTime }}</p>
                  <p>total worked: {{ day.totalWorkedTime }}</p>
                  <hr />
                </div>
                <div>
                  <p>Work Report</p>
                  <textarea
                    v-model="day.report"
                    class="form-control p-2"
                    name="report"
                    cols="10"
                    rows="4"
                    :disabled="!isReadOnly"
                  >
                  </textarea>
                </div>
              </div>
            </td>
            <td v-if="!isActionHide">
              <div class="w-75">
                <button class="button-43 mx-2" @click="isReadOnly = !isReadOnly">
                  {{ !isReadOnly ? 'EDIT' : 'UPDATE' }}
                </button>
                <button
                  class="button-43"
                  style="background-image: linear-gradient(to right, #b0c4de, #b0c4de)"
                  @click="isReadOnly = !isReadOnly"
                  v-if="isReadOnly"
                >
                  cancel
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.tbodyDiv {
  max-height: 600px;
  overflow: auto;
}
.button-43 {
  background-image: linear-gradient(-180deg, #09668e 0%, #1e96c8 100%);
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: #ffffff;
  font-size: 12px;
  padding: 1rem 1.75rem;
  text-decoration: none;
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-43:hover {
  background-image: linear-gradient(-180deg, #1d95c9 0%, #17759c 100%);
}

@media (min-width: 768px) {
  .button-43 {
    padding: 1rem 2rem;
  }
}
</style>
