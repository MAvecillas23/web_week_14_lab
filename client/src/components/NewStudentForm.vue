<script setup>
// code goes here
import { ref, watch } from 'vue'
import { useStudentStore } from "../stores/StudentStore"
import {storeToRefs} from "pinia";

// connects to student store
// used to use the addStudent function
const studentStore = useStudentStore()

const newStudentName = ref('')
const newStarID = ref('')
const formErrors = ref([])  // holds errors for invalid data

const { addNewStudentErrors } = storeToRefs(studentStore)

// if there are validation errors display them to the user
watch( addNewStudentErrors, () => {
  if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
    alert(addNewStudentErrors.value.join('\n'))
  }
} )


function addStudent() {

  formErrors.value = []  //reset form errors

  // check of newStudentName is invalid
  // if student input name is blank add error message to errors list
  if (newStudentName.value.length === 0) {
    formErrors.value.push('Student name must be entered')
  }
  // if id input is blank, add error message to errors list
  if (newStarID.value.length === 0) {
    formErrors.value.push('StarID must be entered')
  }

  // if there are no errors - is the form valid
  if (formErrors.value.length === 0) {
    // new student object that hold new student name, starID, and present
    let student = {
      name: newStudentName.value,
      starID: newStarID.value,
      present: false
    }
    // add student object to the student list
    //add student
    studentStore.addNewStudent(student)

    // clear input text
    newStudentName.value = ''
    newStarID.value = ''

  }

}


</script>
<template>
  <div id="new-student-form-errors" class="m-2">
    <!-- show errors from form validation -->
    <div v-if="formErrors.length > 0" class="alert alert-danger">
      <li v-for="error in formErrors">
        {{error}}
      </li>
    </div>
  </div>

  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <!-- v-model newStudentName -->
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <!-- v-model newStarID -->
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- v-on:click event handler -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>




</template>
<style scoped>
/* CSS here */



</style>