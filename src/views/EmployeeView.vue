<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
axios
const employeesList = ref([])

onBeforeMount(() => {
  fetchEmployeesData()
})

const fetchEmployeesData = async () => {
  try {
    let response = await axios.get('/data/userInformation.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response) {
      employeesList.value = response.data
      console.log('data', employeesList.value)
    }
  } catch (error) {
    console.error('fetched error', error)
    alert('error occured')
  }
}
</script>
<template>
  <div class="text-center mt-2">
    <h3>Employee Information</h3>
    <table class="table table-striped border border-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeesList" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.contact }}</td>
          <td>{{ employee.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
