<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import axios from 'axios'
const userInfo = ref({
  firstName: '',
  lastName: '',
  contact: '',
  address: '',
  postCode: '',
  email: '',
  designation: ''
})
import { useAuthStore } from '../store/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
onBeforeMount(() => {
  fetchUserData()
})
const fullName = computed(() => {
  return `${userInfo.value.firstName} ${userInfo.value.lastName}`
})
const fetchUserData = async () => {
  try {
    const response = await axios.get('/data/userInformation.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      let data = response.data.filter((data) => {
        return data.user_id == user.value.id
      })
      if (data[0]) {
        userInfo.value = {
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          contact: data[0].contact,
          address: data[0].address,
          postCode: data[0].postCode,
          email: data[0].email,
          designation: data[0].designation
        }
      }
    }
  } catch (error) {
    console.error(error)
    alert('error')
  }
}
</script>

<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          /><span class="font-weight-bold">{{ fullName }}</span
          ><span class="text-black-50">{{ userInfo.email }}</span
          ><span> </span>
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">firstName</label
              ><input
                type="text"
                class="form-control"
                placeholder="first name"
                v-model="userInfo.firstName"
              />
            </div>
            <div class="col-md-6">
              <label class="labels">Surname</label
              ><input
                type="text"
                class="form-control"
                v-model="userInfo.lastName"
                placeholder="surname"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">Mobile Number</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter phone number"
                v-model="userInfo.contact"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Address</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter address line 1"
                v-model="userInfo.address"
              />
            </div>

            <div class="col-md-12">
              <label class="labels">Postcode</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter postcode"
                v-model="userInfo.postCode"
              />
            </div>

            <div class="col-md-12">
              <label class="labels">Email ID</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter email id"
                v-model="userInfo.email"
              />
            </div>
            <div class="col-md-12">
              <label class="labels">Designation</label
              ><input
                type="text"
                class="form-control"
                placeholder="Designation"
                v-model="userInfo.designation"
              />
            </div>
          </div>
          <div class="mt-5 text-center">
            <button class="btn btn-primary profile-button" type="button">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
</style>
