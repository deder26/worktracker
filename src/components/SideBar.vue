<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div style="height: 100vh" class="d-flex">
    <div class="d-flex flex-column p-3 text-white bg-dark" style="width: 280px; height: 100%">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <RouterLink
            to="/admin/employee"
            active-class="active"
            class="nav-link text-white"
            aria-current="page"
          >
            EmployeHistory
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/reports" active-class="active" class="nav-link text-white">
            Reports
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="m-3" style="width: 75%"><RouterView /></div>
  </div>
</template>
<style scoped>
.bgcolor {
  background-color: #320788;
  color: white;
}
</style>
