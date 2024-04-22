const { response } = require('express')


const getEventos = (req, res = response) => {

    return res.status(201).json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearEvento = (req, res = response) => {

    // Verificar que tenga el evento 
    console.log( req.body );

    return res.status(201).json({
        ok: true,
        msg: 'crearEvento'
    })
}

const actualizarEvento = (req, res = response) => {

    const { id } = req.params;
    // console.log( req.params ); 

    return res.status(201).json({
        ok: true,
        msg: 'actualizarEvento',
        id
    })
}

const eliminarEvento = (req, res = response) => {

    const { id } = req.params;
    console.log( req.params );

    return res.status(201).json({
        ok: true,
        msg: 'eliminarEvento',
        id
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}