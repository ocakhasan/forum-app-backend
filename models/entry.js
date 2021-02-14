const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    author: String,
    votes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)