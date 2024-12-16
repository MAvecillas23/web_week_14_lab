<script setup>
import { ref } from 'vue'

// prop talks StudentTable to get student data
const props = defineProps({
  student: Object
})

// using props finds the present status of student
const isStudentPresent = ref(props.student.present)

// defining emit
const emit = defineEmits(['arrived-or-left', 'delete-student'])
// notify StudentTable checkbox status has changed
const notifyArrivedOrLeft = () => {
  // emit event
  emit('arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student)
}

</script>
<template>
  <!-- create table rows
        Each row will have a checkbox, bound to the app's data
        When the checkbox is checked/unchecked,
        the student will be signed in/out -->
  <tr v-bind:class="{ present: student.present, absent: !student.present }">

    <td>{{ student.name }}</td>
    <td>{{student.starID}}</td>
    <td>
      <!--            checkbox input that connects to student present object
      when checkbox is unchecked... student.present is false if checked... true-->
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
      <span v-if="student.present" class="mx-3">Here!</span>
      <span v-else class="mx-3">Not present</span>
    </td>
    <td>
      <!--            when button is clicked... call deleteStudent function to remove student from list-->
      <button v-on:click="confirmThenDeleteStudent" class="btn btn-danger">
        <i class="bi bi-trash-fill"></i>Delete
      </button>
    </td>

  </tr>


</template>
<style scoped>

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}


</style>