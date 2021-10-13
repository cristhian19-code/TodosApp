const mongoose = require('../database')


const User = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    todos: [
        {
            id: {
                type: Object,
                default: mongoose.Types.ObjectId()  
            },
            name: {
                type: String
            },
            completed: {
                type: Boolean,
                default: false
            },
            day: {
                type: String,
            },
            hour: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model('User', User)