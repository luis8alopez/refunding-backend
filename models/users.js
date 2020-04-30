//   "email": "eduardo.leo8a@gmail.com",
//   "familyName": "Ochoa",
//   "givenName": "Luis",
//   "id": "115713137916738627867",
//   "name": "Luis Ochoa",
//   "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14Gigg6Lvno9disJwjFDGwzQ47x9ubDQTEJ734dRor_o"
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type:String,
        default:''
    },
    email:{ 
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    id:{
        type:String,
        default:''
    },
    photo:{
        type:String,
        default:''
    }
  });

  const Users = mongoose.model('User',userSchema);

module.exports = Users;