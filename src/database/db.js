// CRIANDO BANCO SQLITE3
// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// exportar arquivo de banco de dados
module.exports = db