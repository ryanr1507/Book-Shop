//Check what environment we are in and decide which keys to use
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}

