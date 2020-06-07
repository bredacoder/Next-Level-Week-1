const express = require("express")
const server = express()

// pegar o banco de dados
const db = require('./database/db')

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.doby na aplicação
server.use(express.urlencoded( { extended: true } ))

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

    // req.query: Query strings da nossa url

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {

    // req.body: O corpo do nosso formulário
    
    // iserir dados no banco de dados
    const query = ` 
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { error: true })
        }

        console.log("Dados enviados com sucesso:")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)
})

server.get("/search", (req,res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 } )
    } 

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})
// ligar o servidor
server.listen(3000) // função que ouve a porta 3000
