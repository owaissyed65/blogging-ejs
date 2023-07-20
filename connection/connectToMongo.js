var mongoose = require('mongoose')
const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/bloggify').then(()=>{
    console.log("Connected to mongodb")
   })
  
}
module.exports = connectToMongo
