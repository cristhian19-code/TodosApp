const { Signup, Login } = require('../middlewares/user.middleware');

const route = require('express').Router();

route.post('/signup',Signup)
route.post('/login',Login)

module.exports = route;