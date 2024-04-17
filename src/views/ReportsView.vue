<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
import WorkDetails from '../components/WorkDetails.vue'
const employeesList = ref([])
const isVisible = ref(false)
const user_id = ref(null)

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
    alert('error occurred')
  }
}

const displayReport = (id) => {
  user_id.value = id
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}
</script>

<template>
  <div class="text-center mt-2">
    <h3>Employee Information</h3>
    <table class="table table-striped border border-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Report details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeesList" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>
            <button type="button" @click="displayReport(employee.user_id)">
              clickHere for details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div class="modal" v-if="isVisible" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <WorkDetails :userId="user_id" :actionHide="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5); /* Modal backdrop */
}

.modal-dialog {
  max-width: 60%;
}

.modal-content {
  background-color: white; /* Background color of the modal */
  border-radius: 0; /* Remove border radius */
}
</style>
