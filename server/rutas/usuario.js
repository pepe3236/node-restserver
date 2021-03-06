const express = require('express')

const bcrypt = require('bcrypt')
const _=require('underscore')

const Usuario = require('../modelos/usuario')
const {verificaToken} = require('../middlewares/auth')
const {verificaAdmin} = require('../middlewares/auth')


const app = express()

app.get('/usuario', [verificaToken, verificaAdmin], (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite)
    
    Usuario.find({}, 'nombre email')
        .skip(desde)
        .limit(5)
        .exec((err, usuarios) =>{
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({},(err,conteo) =>{

                res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            });

            })

            
        })


  })
  
  app.post('/usuario', [verificaToken, verificaAdmin], (req, res) => {
   
      let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10) ,
        role: body.role
    })

usuario.save((err, usuarioDB) => {
    if(err) {
        return res.status(400).json({
            ok: false,
            err
        })
    }

    usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
            
        })

});
 
    })
  
    app.put('/usuario/:id', [verificaToken, verificaAdmin], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre','email','img','role','estado'])

  delete body.password;
  delete body.google;
  
        Usuario.findByIdAndUpdate(id, body, {new:true}, (err, usuarioDB)=>{

            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });

        })

    })
   
    app.delete('/usuario/:id', [verificaToken, verificaAdmin],  (req, res) => {
      
        let id = req.params.id;

        Usuario.findByIdAndRemove(id,(err, idremovido) =>{

            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if(!idremovido) {
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'Usuario no encontrado'
                    }
                });
            }
            

            res.json({
                ok:true,
                usuario: idremovido
            })


        })





    })

    module.exports = app;