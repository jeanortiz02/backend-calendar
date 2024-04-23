const { response } = require('express')
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name')

    return res.status(201).json({
        ok: true,
        eventos
    })
}

const crearEvento = async(req, res = response) => {

    // Verificar que tenga el evento 
    // console.log( req.body );

    const evento = new Evento( req.body );


    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true, 
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    // console.log( uid );


    try {
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false, 
                msg: 'Evento no existe con ese id'
            })
        } 

        // Validacion de que el usiario fue quien creo
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene privilegios de editar este evento'
            })
        }


        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true});

        res.status(201).json({
            ok: true, 
            evento: eventoActualizado
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    // console.log( uid );


    try {
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false, 
                msg: 'Evento no existe con ese id'
            })
        } 

        // Validacion de que el usiario fue quien creo
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene privilegios de eliminar este evento'
            })
        }

         await Evento.findByIdAndDelete( eventoId );

        res.status(201).json({
            ok: true
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}