var mongoose = require('mongoose')
const connectToMongo = (uri) => {
    mongoose.connect(uri).then(()=>{
    console.log("Connected to mongodb")
   })
  
}
module.exports = connectToMongo
