/* 
    Rutas de Usuarios / Events Routes
    host + /api/events

*/
const { Router } = require('express')
const { check } =  require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Todas tienen que pasar por la validacion del JWT
// Obtener eventos

// Otra opcion de validar middlewares desde un nivel superior es 
router.use( validarJWT );

router.get('/', getEventos)

//Crear un nuevo evento 
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de final es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar el evento
router.put('/:id', actualizarEvento);

// Borrar Evento 
router.delete('/:id', eliminarEvento);


module.exports = router;