const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };

// const { isValid } = require('date-fns');
     
// const isDate = (dateValue) => {
//   if (!dateValue) return false;
 
//   const date = isValid(dateValue); // retorna true o false
//   return date;
// };
 
// module.exports = {
//   isDate
// } 