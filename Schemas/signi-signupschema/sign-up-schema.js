const mongoose = require('mongoose');
require("dotenv").config();

const URI = process.env.URI
const bcrypt = require('bcrypt');

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(console.log(
  "connections successfully made!"
)).catch(err => {
  console.log(err)
})

const User_Registration_Infos = mongoose.Schema({
  firstname: {
    type:String,
    required: true,
    minLength: 3
  },
  lastname: {
    type:String,
    minLength: 3
    // required:true
  },
  email: {
    type:String,
    required:true,
    minLength: 3
  },
  phone: {
    type:String,
    minLength: 11
    // required:true
  },
  password: {
    type: String,
    minLength: 5,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
})

User_Registration_Infos.pre('save', function (next) {
  let now = Date.now();
  // setting the updated time to the current time which is now
  this.updatedAt = now;

   // Set a value for createdAt only if it is null
   if (!this.createdAt) {
    this.createdAt = now
  }

   // Call the next function in the pre-save chain
   next() 
})

User_Registration_Infos.pre('save',async function(next){
  let {password} = this;
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(password,salt)
  next();
})
module.exports = mongoose.model('Users_Details', User_Registration_Infos);

