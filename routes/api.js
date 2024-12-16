const express = require('express')
const database = require('../models')   // will require the index.jss file from this directory
const Student = database.Student // the student model

const router = express.Router()

// get students from studentList
router.get('/students', function(req, res, next) {
    // query database that gets all rows from database
    // convert to json
    // available in the then function
    // note: for the order inside the findall function is to order list by name alphabetically
    Student.findAll( { order: ['name'] } ).then(students => {
        return res.json(students)
    })
})

// for when a new student is added
router.post('/students', function(req, res, next) {
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        // 400 = bad request - user is sending invalid data server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            // some other error?
            next(err)
        }
    })
})

router.patch('/students/:id', function(req, res, next) {
    // matches requests to students/1/ students/2/ .... etc
    // req.params stores the ide value
    const studentID = req.params.id
    const updateStudent = req.body // updated data about student
    console.log(updateStudent)
    Student.update(updateStudent, { where: {id: studentID}}).then((result) => {
        // how many rows were modified
        const rowsModified = result[0]
        // if a row that was modified is found send a message
        if (rowsModified === 1) {
            return res.send('Student updated')
        }
        // if no rows were modified
        else {
            // if 0 rows updated student was not found
            res.status(404).send('Student not found')
        }
    }).catch(err => {   // db error - cant connect
        // invalid data in the updatedStudent - no name, star id
        // 400 = bad request - user is sending invalid data server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        } else {
            // some other error?
            next(err)
        }
    })

    // what errors?
    // student id doesnt exist
    // database problems - app cant connect to db


})

router.delete('/students/:id', function(req,res,next) {
    // delete request to api/students/4 will delete student with id 4
    const studentID = req.params.id
    Student.destroy({where: {id: studentID}}).then((rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        }
        // if student id doesn't exist display this else statement
        else {
            return res.status(404).send('Student not found')
        }
    }).catch(err => {
        return next(err)
    })


})

module.exports = router