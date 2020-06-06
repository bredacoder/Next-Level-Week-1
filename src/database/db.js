// importar a dapendencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")// cria um bd nesse caminho

// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {    // roda uma sequencia de códigos

    // Com comandos SQL eu vou:

    // 1 Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT, 
            city TEXT,
            items TEXT
        );
    `)

    // 2 Inserir dados na tabela
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)// referência a resposta que o run retorna
    }

    db.run(query, values, afterInsertData) 

    // 3 Consultar os dados da tabela

    // 4 Deletar um dado da tabela
})

// INTEGER => TIPO NUMÉRICO DO SQL
// PRIMARY KEY => Campo principal que a tabela usa p/ identificar o registro
// AUTOINCREMENT = Campo que se auto incrementa 