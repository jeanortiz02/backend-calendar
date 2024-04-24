const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario.js');
const { generarJWT } = require('../helpers/jwt.js')


const crearUsuario = async(req, res = response) => {
    
    const { name, email, password } = req.body;


    try {
        let usuario = await Usuario.findOne({ email});

        // Validation if user exists
        if ( usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }

        // Instancia del usuario
        usuario = new Usuario( req.body );


        // Encriptar password 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT 
        const token = await generarJWT( usuario.id, usuario.name);
    
    
        res.status(201).json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador '

        })
    }
}


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Valida el email
        const usuario = await Usuario.findOne({ email});
    
        if ( !usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            })
        }


        // Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto' 
            })
        }

        // Generar JWT 
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token

        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador '

        })
    }
};


const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name);

    res.json( {
        ok: true,
        uid,
        name,
        token
    })
};



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}