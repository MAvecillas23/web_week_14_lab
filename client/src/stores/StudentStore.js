import {defineStore} from 'pinia'
import { ref, computed} from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

// student store holds studentList data and add new student and delete student functions
// data that the store is going to use
export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([])
    const mostRecentStudent = ref({}) // empty object
    const addNewStudentErrors = ref([])

    function getAllStudents() {
        // make an API request to get all students and save in studentList
        studentAPI.get().then(students => { // students ist the JSON response from the API
            sortedStudents.value = students
        }).catch(err => {
            console.log(err)
        })
    }

    // add new student to studentList
    function addNewStudent(student) {
        // make api call to add new student
        // call getALlStudents to re-request list of students from api server
        studentAPI.post(student).then(() => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        } )
    }
    // delete student from studentList
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then(() => {
            mostRecentStudent.value = {}
            getAllStudents()
        }).catch(err => {
            console.log(err)
        })
    }

    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then(() => {
            mostRecentStudent.value = student
            getAllStudents()
        }).catch(err => {
            console.log(err)
        })
    }

    // computed property that returns the number of students in studentList
    const studentCount = computed( () => {
        return sortedStudents.value.length
    })
    // computed property that sorts studentList
    // const sortedStudents = computed( () => {
    //     return studentList.value.toSorted( (s1, s2) => {
    //         return s1.name.localeCompare(s2.name)
    //     })
    // })


    return {
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        //functions
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        getAllStudents,

        // computed properties
        studentCount,
    }
} )