
const express = require ('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// console.log( process.env)


// Crear el servidor de express 
const app = express();

// Base de datos
dbConnection();

// cors 
app.use( cors() );


// Directorio publico 
app.use( express.static( 'public' ) ); 

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

// Cualquier ruta
app.get( '*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html')
})

// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Escuchando peticiones en el puerto ${process.env.PORT}`)
})