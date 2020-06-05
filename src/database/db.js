// importar a dapendencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")// cria um bd nesse caminho

// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {    // roda uma sequencia de códigos
    // Criar uma tabela

    // Inserir dados na tabela

    // Consultar os dados da tabela

    // Deletar um dado da tabela
})