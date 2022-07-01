try {
    require('dotenv').config({ path: './.env' }); // enviroment variables
    require('./server');
} catch(e) { 
    console.log(e); 
    process.exit(1);
}
