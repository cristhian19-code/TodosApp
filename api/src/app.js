const express = require('express');
const app = express();
//const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.set('port',process.env.PORT || 9000)

//config
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//middleware
//app.use(morgan('dev'));

//rutas
app.use(require('./routes/user.routes'))
app.use(require('./routes/todo.routes'))

module.exports = app