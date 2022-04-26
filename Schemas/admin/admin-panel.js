const mongoose = require('mongoose');

const URI = process.env.URI
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then( console.log(" Admin-Panel connected successfully")).catch(err => {
  console.log(err)
})

const AdminPanel = mongoose.Schema({
  categories : {
    required: true,
    type:String,
  }
})

module.exports = mongoose.model('category', AdminPanel);