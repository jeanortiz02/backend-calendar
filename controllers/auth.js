const { response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario.js');


const crearUsuario = async(req, res = response) => {
    
    const { name, email, password } = req.body;


    try {
        
        let usuario = await Usuario.findOne({ email});
        // console.log(usuario);
        
        // Validation if user exists
        if ( usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }

        usuario = new Usuario( req.body );
        await usuario.save();
    
    
        res.status(201).json({
            ok: true, 
            uid: usuario._id,
            name: usuario.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador '

        })
    }
}


const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.status(201).json( {
        ok: true,
        msg: 'Login',
        email, 
        password
    })
};


const revalidarToken = (req, res = response) => {

    res.json( {
        ok: true, 
        msg: 'Renew'
    })
};



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}