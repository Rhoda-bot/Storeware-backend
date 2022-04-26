const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const signin_signup_route = require('./Routes/sign-in-sign-up');
const admin_registration = require('./Routes/admin/admin-registration');
const admin_categories = require('./Routes/admin/admin-dashboard');

const port = process.env.PORT || 3500;
app.use(cors({origin:'http://localhost:3000', credentials:true}));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('welcome to the e-commerce StoreWear!');
}) 
app.use(signin_signup_route);
app.use('/admin',admin_registration);
app.use('/categories', admin_categories);


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})
