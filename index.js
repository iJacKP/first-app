const express = require('express');
const app = express(); 
const routes = require('./routes');
const expressLayouts = require('express-ejs-layouts');
const {urlencoded} = require('express');


const port = 3000;
const address = "localhost"; 

const utils = require('./utils');
const faker = require('faker')

const toggleBool = true;


global.users =  []
for (let cont=0;cont<20;cont++){
    users.push({name:faker.name.findName(),email:faker.internet.email(),address:faker.address.streetAddress(),age:utils.getRandomByInterval(15,50,true),heigth:utils.getRandomByInterval(1.50,1.70,false).toFixed(2),vote:toggleBool});
    toggleBool!=toggleBool;
}




app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes); 



const server = app.listen(port, address,()=>{ 
    let host = server.address().address;     
    let port = server.address().port;      
    console.log(`Servidor executando no endereço ${host} e porta ${port}`); 
});                                                                         