/* 
    Rutas de Usuarios / Auth 
    host + /api/auth

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();


router.post( 
    '/new', 
    [   // Middleware
        check('name', 'EL nombre es obligatorio').not().isEmpty(),
        check('email', 'EL Email es obligatorio').isEmail(),
        check('password', 'Password debe contener minimo 6 caracteres').isLength( { min: 6 } ),
        validarCampos
    ], 
    crearUsuario)

router.post( 
    '/', 
    [
        check('email', 'Este email no es valido y es obligatorio').isEmail(),
        check('password', 'La longitud minima es de 6 caracteres').isLength( { min: 6 } ),
        validarCampos
    ], 
    loginUsuario)

router.get( '/renew', revalidarToken)



module.exports = router;