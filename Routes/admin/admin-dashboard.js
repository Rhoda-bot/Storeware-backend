const express = require('express');
const adminPanel = require('../../Schemas/admin/admin-panel');
const admin_categories = express.Router();

admin_categories.post('/items-categories',async(req, res) => {
  const { category } = req.body;
  const check_if_category_exist = await adminPanel.findOne({categories:category});
  console.log( check_if_category_exist);
  if (check_if_category_exist) return res.send({ msg: "this category already exist!"})
  await adminPanel.create({categories:category}, (err, msg) => {
  if (msg) return res.send( msg ? {msg:"category inserted successfully!"}: err)
  })

})


admin_categories.get('/get-categories', async(req, res) => {
  const getAllCategory = await adminPanel.find();
  // console.log(getAllCategory);
 return res.send(getAllCategory);
})


// admin_categories.post('/upload-image', async(req, res ) => {
//   console.log(req.body.data);
//   res.send('hellloooo')
// })
module.exports = admin_categories;