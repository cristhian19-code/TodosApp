const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({
        message: 'Acceso Denegado',
        error: true
    }) 

    try {
        //verificando si el token es valido
        const verify = jwt.verify(token,process.env.SECRET_TOKEN);
        req.body._id = verify._id
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Se produjo un error',
            error: true
        })
    }
}

module.exports = {
    verifyToken
}