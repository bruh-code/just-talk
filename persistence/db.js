let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/justtalk')

let messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    date: { type: Date, default: Date.now }
}, { collection: 'messagescollection' }
)

module.exports = { Mongoose: mongoose, MessageSchema: messageSchema }
