// Utilizar o objeto db para nossas operações
db.serialize(() => {
    /* || Com comandos SQL eu vou: */

    // 1- criar uma tabela 
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

    // 2- Inserir dados na tabela
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
        "https://cdn.pixabay.com/photo/2021/01/15/17/01/green-5919790__340.jpg",
        "Colectoria",
        "Guilherme Gemballa. Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    // afterInsertData: após inserir dados
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
    }
    db.run(query, values, afterInsertData)

    // 3- Consultar os dados da tabela
     db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus regsitros: ")
        console.log(rows)
    }) 

    // 4- Deletar um dado da tabela
     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro Deletado!!!")
    })
})
