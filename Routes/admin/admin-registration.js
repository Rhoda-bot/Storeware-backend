const express = require('express');
const admin_registration = express.Router();
const bcrypt = require('bcrypt');

const Admin_Registration = require('../../Schemas/admin/admin-schema');
const { send } = require('express/lib/response');

admin_registration.post('/sign-up', async(req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  let check_if_user_exist = await Admin_Registration.findOne({email});
  if (check_if_user_exist) return res.send({msg: 'user exist!'}) 
  await Admin_Registration.create({ firstname, lastname, email, phone, password }, (err, msg) => {
   if(msg) return res.send(msg ? msg : err)
  })
})

admin_registration.post('/sign-in', async( req, res) => {
  const { email, password } = req.body;
  const fetchUser = await Admin_Registration.findOne({email})
  if(!fetchUser) return res.send("email dos'nt exist")
    bcrypt.compare( password, fetchUser.password, function(err, result) {
      if (result) return res.send(result)
      return res.send(err === undefined ? 'Incorrect password' : err)   
      
       
     
    });

  
})

module.exports = admin_registration;