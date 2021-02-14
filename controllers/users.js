const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('entries', { content: 1, date: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        email: body.email,
        name: body.name,
        passwordHash,
    })
    try{
        const savedUser = await user.save()
        response.json(savedUser)
    } catch(exception) {
        next(exception)
    }


})

module.exports = usersRouter