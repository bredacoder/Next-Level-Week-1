const express = require("express")
const server = express()

// configurar pasta pública
server.use(express.static("public"))

// Template Engine
const nunjucks = require("nunjucks");
/*                 pastas do html*/  
nunjucks.configure("src/views", {
    express: server, // liga o nunjucks ao express
    noCache: true
})


// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => { // configuração de rotas
// Retorna a renderização da página/rota após passa-la pelo motor do nunjucks
    return res.render("index.html", { title: "Um título" }) 
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {
    return res.render("search-results.html")
})
// ligar o servidor
server.listen(3000) // função que ouve a porta 3000
