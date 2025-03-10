const express = require("express");

const server = express();

server.use(express.json());
//Query params = ?nome=NodeJS
//Routes params = /curso/3
//Request Body = { nome: 'Nodejs', tipo: 'backend' }

//CRUD> create, Read, Update, Delete

const cursos = ["Node.js", "Javascript", "React", "Cypress", "Java", "Flutter", "html"];

//Middleware Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA ${req.url}`);

    return next();
  });

  function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: "Nome do curso é obrigatorio"})
    }

    return next();
  }

  function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index]
  if(!curso){
    return res.status(400).json({ error: "O curso não existe"})
}

req.curso = curso

    return next();
  }

server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

//localhost:3002/curso
server.get("/cursos/:index",checkIndexCurso, (req, res) => {
  return res.json(req.curso);
});

//Criando um novo curso
server.post("/cursos",checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//Atualizando um curso
server.put("/cursos/:index",checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const{name} = req.body

  cursos[index] = name
  
  return res.json(cursos)
});

//Deletando algum cursos
server.delete("/cursos/:index",checkIndexCurso, (req, res) => {
    const { index } = req.params

    cursos.splice(index, 1)
    return res.send()
  });

server.listen(3000);
