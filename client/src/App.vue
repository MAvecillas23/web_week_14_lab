<script setup>
// code goes here
import { onMounted } from 'vue'

import NewStudentForm from "./components/NewStudentForm.vue";
import StudentTable from "./components/StudentTable.vue";
import StudentMessage from "./components/StudentMessage.vue";

import { useStudentStore } from "./stores/StudentStore.js";

const studentStore = useStudentStore()

onMounted( () => {
  // whatever is in here will run when the component is first displayed
  // in other words... this is what will run when the webpage is loaded
  studentStore.getAllStudents()

})
</script>
<template>
  <!--HTML goes here-->
<!--  components. each component has complex code and templates
      components can have other components inside of them as well
      like how StudentTable has StudentRow as the child component -->
  <NewStudentForm></NewStudentForm>

  <StudentTable></StudentTable>

  <StudentMessage></StudentMessage>




</template>
<style scoped>
/* CSS here */



</style>