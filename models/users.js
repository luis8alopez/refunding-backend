const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buySchema = new Schema({
    precio: {
        type: Number,
        min: 50,
        default: 0
    },
},
    {
        timestamps: true
    });

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    history: [buySchema]
}, {
    timestamps: true
});



const Users = mongoose.model('User', userSchema);

module.exports = Users;