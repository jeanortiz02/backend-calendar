const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_URI );

        console.log('DB connection established')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos');
    }
};


module.exports = {
    dbConnection
}