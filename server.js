const express = require('express');
const nunjucks = require('nunjucks'); // template engine usada para renderizar páginas e aplicar lógicas simples a estas

const receitas = require('./data') // carrega fonte de dados 
const fs = require('fs') // alterar o arquivo data.js
const server = express();
const Serverport = 3300; // TODO: usar método para definir porta 

// ordena pelo numero de likes usando o reverse
// use slice() to copy the array and not just make a reference
const byNumAcessos = receitas.slice(0);
byNumAcessos.sort(function(a,b) {
    return a.numAcessos - b.numAcessos;
}).reverse();

/******************************
 *  Server Setups   
 ******************************/
// configurar express para usar arquivos estaticos das pastas abaixo
    server.use(express.static('public/css')); 
    server.use(express.static('public/img')); 
    server.use(express.static('public/')); 

server.set("view engine", "njk") // define qual o motor de view, neste caso Njk

nunjucks.configure("views",{
    express: server,
    autoescape: false, // permite mostrar levar html do back end para o front
    noCache: true 
})// configura qual a pasta dos templates

/******************************
 *  ROTAS  
 ******************************/
server.get("/", function(req,res){
    return res.render("index", { receitasPorAcesso : byNumAcessos }); // renderiza a views e passa parametros
})

server.get("/receitas", function(req,res){
    return res.render("receitas", { ListaReceitas : receitas }); // renderiza a views
})

server.get("/sobre", function(req,res){
    return res.render("sobre"); // renderiza a views
})

// pagina carregada de acordo com a query string 
server.get("/receita", function(req,res){
    const id = req.query.id;
    const receitaEncontrada = receitas.find(function(receitaEncontrada){
        return receitaEncontrada.id == id; // ja retorna true ou false
    });

    if (!receitaEncontrada){
        return res.send("Receita não encontrada");
    }

    return res.render("receita", { receita: receitaEncontrada })
        
})


/******************************
 *  Setup do server para execução    
 ******************************/
server.listen(Serverport, function(){
    console.log(`server is running at port ${Serverport}` );
})