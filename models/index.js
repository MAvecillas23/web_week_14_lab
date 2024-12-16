const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

// look for an environment variable called NODE_ENV and read its value
// environment are values set for your whole computer or server
// any application running can read these environment variables
// at azure, we'll create an environment variable for your server called 'NODE_ENV' and set it to production
// if there is no NODE_ENV set on your computer we'll use the value 'development'
const env = process.env.NODE_ENV || 'development'

const config = configJson[env] // read the DB configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    Sequelize : Sequelize
}

// create student model from student.js
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name  // 'Student'
database[studentModelName] = studentModel

module.exports = database