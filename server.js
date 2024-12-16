const express = require('express')
const apiRoutes = require('./routes/api')
const path = require('path')


const app = express()   //  make a new express app

const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)   // request to home page, serve Vue app index.html files

app.use(express.json())

app.use('/api', apiRoutes)

app.use(function(req, res,next) {
    // can't find a matching route
    res.status(404).send('Sorry, not found')
})

// errors: throw this function when there is an error that was not caused by user
app.use(function(err, req, res,next) {
    console.log(err)
    res.status(500).send('Server error')
})

// create and run server
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})