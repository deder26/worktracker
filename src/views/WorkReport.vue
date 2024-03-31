<template>
  <div>
    <form>
      <div class="form-group d-flex flex-column justify-content-center align-items-center">
        <label for="exampleFormControlTextarea1" class="m-2"><h3>Work Report</h3></label>
        <textarea
          class="form-control w-50"
          id="exampleFormControlTextarea1"
          rows="6"
          v-model="workReport.work_report"
        ></textarea>
        <div class="datepciker mt-4">
          <VueDatePicker
            v-model="work_date"
            :format="format"
            @update:model-value="fetchCurrentReportData"
          >
          </VueDatePicker>
        </div>
        <button type="submit" class="btn btn-primary m-3">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentDate } from '../shared/dateAndTime.js'
import axios from 'axios'
let work_date = ref(getCurrentDate())
let user_id = 1
let workReport = ref({
  work_report: '',
  date: work_date
})

onMounted(() => {
  fetchCurrentReportData()
})

let fetchCurrentReportData = async (modelData) => {
  work_date.value = getCurrentDate(modelData)
  await axios
    .get('/data/work_report.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log()
      let data = response.data.filter(
        (report) => report.date === work_date.value && report.user_id === user_id
      )

      if (data.length > 0) {
        console.log(data)
        workReport.value.work_report = data[0].work_report
        workReport.value.date = data[0].date
      } else {
        workReport.value = {
          work_report: '',
          date: work_date
        }
      }
    })
}

const format = (work_date) => {
  const dateString = getCurrentDate(work_date)
  work_date.value = dateString
  return dateString
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
