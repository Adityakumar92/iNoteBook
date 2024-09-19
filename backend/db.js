const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongDB%20Campass&directConnection=true&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>console.log("Connected to Mongo Successfully"))
    .catch(err=> console.log(err.message));
}


module.exports=connectToMongo;