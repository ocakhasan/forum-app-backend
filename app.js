const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const entriesRouter = require('./controllers/entries')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

console.log('connecting to mongoDB')
const mongodb_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(config.MONGODB_URI, mongodb_config)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((error) => {
        console.error('error connecting to mongo db', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/entries', entriesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app