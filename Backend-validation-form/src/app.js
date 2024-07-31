const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const morgan = require('morgan');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Settings 
app.set('port', process.env.PORT || 3000);

//middleware

app.use(morgan('dev')); 


//Configuracion de CORS para permitir solicitudes solo desde un origen especifico 
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
    credentials: true
}));



app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root', 
    port: '3306', 
    database: 'Register' 
}, 'single'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes

const indexRoutes = require('../routes/ruta');
app.use('/', indexRoutes);

//Start server  
app.listen(app.get('port'), () => {
    console.log('Server on port 3000'); 

});