const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buySchema = new Schema({
    precio: {
        type: Number,
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
    currentMoney:{
        type: Object,
        default:{            
                "50": 0,
                "100": 0,
                "200": 0,
                "500": 0,
                "1000": 0,
                "2000": 0,
                "5000": 0,
                "10000": 0,
                "20000": 0,
                "50000": 0,
                "100000": 0
        },
        auto: true
    },
    history: [buySchema]
}, {
    timestamps: true
});



const Users = mongoose.model('User', userSchema);

module.exports = Users;