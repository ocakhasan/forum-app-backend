const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
}


entriesRouter.get('/', async (request, response, next) => {
    try {
        const entries = await Entry.find({}).populate('user', {username: 1, name: 1})
        response.json(entries)
    } catch (exception) {
        next(exception)
    }
})

entriesRouter.get('/:id', async (request, response, next) => {
    try {
        const entry = await Entry.findById(request.params.id)
        if (entry) {
            response.json(entry)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

entriesRouter.post('/', async (request, response, next) => {

    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)
    const entry = new Entry({
        title: body.title,
        content: body.content,
        author: body.author,
        date: new Date(),
        votes: body.votes,
        user: user._id
    })

    try {
        const savedEntry = await entry.save()
        user.entries = user.entries.concat(savedEntry._id)
        await user.save()
        response.json(savedEntry)
    } catch (exception) {
        next(exception)
    }
})

entriesRouter.delete('/:id', async (request, response, next) => {
    try {
        await Entry.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})


entriesRouter.put('/:id', async (request, response, next) => {
    
    const body = request.body
    const entry = {
        title: body.title,
        content: body.content,
        author: body.author,
        votes: body.votes
    }

    try{
        await Entry.findByIdAndUpdate(request.params.id, entry, {new:true})
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = entriesRouter