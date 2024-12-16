// something else in another file will call something with sequelize and DataTypes
module.exports = (sequelize, DataTypes) => {
    // define the model
    const Student = sequelize.define('Student', {
        // define the columns in the database - give name and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false,    // as shown below with other fields, allowNull checks if we will allow a field to be empty or not
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,    // unique constraint... every starID must be unique from each other
            validate: {
                notEmpty: false
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false  // present bool will be false by default
        }
    })
    // create or update table in the database
    Student.sync({force: false}).then(() => {
        console.log('Synced student table')
    })

    return Student
}

