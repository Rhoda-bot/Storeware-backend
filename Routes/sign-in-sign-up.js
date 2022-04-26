const express = require('express');
const signin_signup_route = express.Router();
const userDetails = require('../Schemas/signi-signupschema/sign-up-schema');

signin_signup_route.post('/sign-up', async(req,res)=> {
  const { firstname,lastname, email,phone, password} = req.body.users;
 
  await userDetails.create({firstname, email, password},(err, msg)=>{
    if (err) {
      console.log(err);
      res.send(err);
    }else{
      res.send(msg);
    }
  })
})
module.exports = signin_signup_route;