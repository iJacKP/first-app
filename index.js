const express = require("express");
const app = express();
const routes = require("./routes");

const expressLayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");

const port = 3000;
const address = "localhost";


global.users =[
    {
        name: "Jackson Pontes",
        email: "jackson_pc@gmail.com",
        address: "Rua Xiu, 32",
        height: "1.72m",
        age: 19,
        vote: "Sim"
    },
    {
        name: "Pablo José",
        email: "pablo_pj@virtual.ufc.br",
        address: "Rua lac de soi, 321",
        height: "1.60m",
        age: 22,
        vote:"Sim"
    },
    {
        name: "Maria DB",
        email: "mariaDb@maria.com",
        address: "Rua 55, 20",
        height: "1.75m",
        age: 30,
        vote: "Sim"
    },
    {
        name: "Mario DB",
        email: "marioDb@mario.com",
        address: "Rua, 525",
        height: "1.70m",
        age: 15,
        vote: "Não"
    },
    {
        name: "Jumbatron",
        email: "jumbatron@modaly.com",
        address: "Rua lol, 203",
        height: "1.80m",
        age: 36,
        vote: "Sim"
    },
    {
        name: "Pearl",
        email: "pearl@lfe.com",
        address: "Rua izzy, 66",
        height: "1.72m",
        age: 18,
        vote: "Sim"
    },
];



app.set('view engine','ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/',routes);

const server = app.listen(port,address,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log(`> Server rodando em http://${host}:${port}`);
});