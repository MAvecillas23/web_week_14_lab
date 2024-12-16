<script setup>
// code goes here
import { useStudentStore} from "../stores/StudentStore.js"; //this connects to the StudentStore.js
import { storeToRefs } from "pinia" // converts properties from store into refs within a component
import { computed } from 'vue'
import StudentRow from './StudentRow.vue' // import student row

// assigns all data from StudentStore to this variable
const studentStore = useStudentStore()
// convert things from store to refs and computed property to sortedStudents
const { sortedStudents, studentCount } = storeToRefs(studentStore)

// get the deleteStudent function from student store and assign it to deleteStudent variable
const deleteStudent = (student) => {
  studentStore.deleteStudent(student)
}
// keeps track of the last student who arrived or left (last student checkbox that was clicked
const arrivedOrLeft = (student, isStudentPresent) => {
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student)
}

// computed property for if there is only one student in studentList display
// a different message
const pluralStudentMessage = computed( () => {
  if (studentCount.value === 1) {
    return 'There is 1 student in class'
  } else {
    return `There are ${studentCount.value} students in class`
  }
})



</script>
<template>
  <!--HTML goes here-->
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <!--    computed property updates number of students everytime a student is added -->
    <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>
    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete?</th>
        </tr>
        </thead>

        <tbody>
<!--        this receives changes/ data from StudentRow via emits and calls
            functions in this component-->
          <StudentRow
              v-for="student in sortedStudents"
              v-bind:student="student"
              v-on:arrived-or-left="arrivedOrLeft"
              v-on:delete-student="deleteStudent"
          ></StudentRow>



        </tbody>

      </table>
    </div>
  </div>




</template>
<style scoped>
/* CSS here */
#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

</style>
