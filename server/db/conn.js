const mongoose  = require('mongoose');

const DB = process.env.DATABASE;

// mongoose.connect(DB, {
//     useNewUrlParser: true,
// }).then(()=>{
//     console.log(`connection successful`)
// }).catch((err)=>console.log(`no connection`));

try{
    mongoose.connect(DB, { 
        useNewUrlParser: true, 
    }, console.log("conection successful ")) ;
    }
catch(error) { console.log(" no connection ") ;}