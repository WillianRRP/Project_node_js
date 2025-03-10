const express = require('express');

const server = express();
//Query params = ?nome=NodeJS
//Routes params = /curso/3
//Request Body = { nome: 'Nodejs', tipo: 'backend' }

const cursos = ['node JS', 'javascript', 'React', 'cypress'];


//localhost:3002/curso
server.get('/curso/:index', (req, res) =>{

    const { index } = req.params;

   return res.json(cursos[index])
})

server.listen(3000);