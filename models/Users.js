require('../db/dbconnection')

const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    date: String,
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ],

})

try {
    const Users = mongoose.model('Users', usersSchema);
    module.exports = Users;
}
catch (e) {
    console.log('error is user schema', e)
}

