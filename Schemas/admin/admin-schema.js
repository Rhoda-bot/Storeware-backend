const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const URI = process.env.URI
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then( console.log(" Admin connected successfully")).catch(err => {
  console.log(err)
})

const AdminSignup = mongoose.Schema({
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
    // required: true
  },
  createdAt: Date,
  updatedAt: Date

})

AdminSignup.pre('save', function (next) {
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

AdminSignup.pre('save',async function(next){
  let {password} = this;
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(password,salt)
  next();
})

module.exports = mongoose.model('Admin_Registration', AdminSignup);