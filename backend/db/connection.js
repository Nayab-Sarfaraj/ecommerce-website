const mongoose = require('mongoose');

connectDatabase().then(()=>console.log("connected to database")).catch(err => console.log(err));


async function connectDatabase() {
  await mongoose.connect("mongodb://127.0.0.1:27017/lucid");

  
}


module.exports=connectDatabase
