const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

const Signup = async (req,res)=>{
    const {password,email} = req.body;

    const validate = await userModel.findOne({email});

    if(validate) return res.json({
        message: 'Correo en uso',
        error: true
    })

    const salt = await bcrypt.genSalt(5)
    const passwordEncrypt = await bcrypt.hash(password,salt);

    req.body.password = passwordEncrypt

    const user = new userModel(req.body);

    await user.save()

    res.json({
        data: 'Registro Exitoso',
        error: false
    })
}

const Login = async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email})

    if(!user) return res.json({
        message: 'Usuario no registrado',
        error: true
    });

    const verify = await bcrypt.compare(password,user.password)
    
    if(!verify) return res.json({
        message: 'Credenciales incorrectas',
        error: true
    });
    
    const token = jwt.sign({
        email: user.email,
        firstname: user.firstname,
        _id: user._id
    },process.env.SECRET_TOKEN);


    res.json({
        data: {
            token,
            name: user.firstname,
        },
        message: 'Bienvenido',
        error: false
    });
}

module.exports = {
    Signup,
    Login
}