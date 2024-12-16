<script setup>
// code goes here

// connect to student store
import {useStudentStore} from "../stores/StudentStore"
import { storeToRefs} from "pinia"
const studentStore = useStudentStore()

// connect mostRecentStudent from store
const { mostRecentStudent } = storeToRefs(studentStore)

</script>
<template>
  <!--HTML goes here-->
  <div id="welcome-or-goodbye-message" class="m-2">

    <!-- show a message when student arrives or leaves  -->
    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome, {{mostRecentStudent.name}}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{mostRecentStudent.name}}, see you later.
      </div>


    </div>

  </div>


</template>
<style scoped>
/* CSS here */



</style>