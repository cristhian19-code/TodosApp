const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.ro5vj.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`
const options = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}

mongoose.connect(uri,options).then((result)=>{
    console.log('Base de datos conectada');
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose;