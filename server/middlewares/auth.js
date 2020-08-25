
const jwt = require('jsonwebtoken');
const usuario = require('../modelos/usuario');


//============================
// Verificar token
//============================


let verificaToken = (req, res, next) => {

    let Auth = req.get('Auth');

    jwt.verify( Auth, process.env.SEED, (err, decoded)=> {
        if (err){
            return res.status(401).json({
                ok: false,
                err: {
                    messagge: 'Token no valido.'
                }
            })
        }

        req.usuario = decoded.usuario;
        next()
    })
};

//============================
// Verificar admin
//============================

let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if(usuario.role === 'admin_role'){
        next()
    }else{
         res.json({
        ok: false,
        err: {
            messagge: 'El usuario no es administrador.'
        }
    })
    }
}










module.exports = {
    verificaToken,
    verificaAdmin
}