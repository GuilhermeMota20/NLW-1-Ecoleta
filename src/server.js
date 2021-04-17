const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta public
server.use(express.static("public"))
/* ----------------------------------------------------------------------------------------------------------- */

// habilitar o uso do req.body nanossa aplicação
server.use(express.urlencoded({ extended: true }))

/* ----------------------------------------------------------------------------------------------------------- */

/* Template Engine - Nunjucks*/
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
/* ----------------------------------------------------------------------------------------------------------- */


// configurar caminhos da aplicação
// pagina inicial
// req= requisição
// res= respostas

// index
server.get("/", (req, res) => { 
    return res.render("index.html", {  })
})

// create-point
server.get("/create-point", (req, res) => { 
    // req.query: Query Strings da nossa url
    // console.log(req.quey)


    return res.render("create-point.html")
})

// enviando formulário para o banco de dados no formato post
server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
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

    // afterInsertData: após inserir dados
    function afterInsertData(err) {
        if(err) {
            console.log(err)

            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})

// search-results
server.get("/search", (req, res) => { 

    // pesquisa de pontos
    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    // pegar os dadosdo banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        // total de elementos dentro do array
        const total = rows.length

        console.log("Aqui estão seus regsitros: ")
        console.log(rows)
        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)
/* ----------------------------------------------------------------------------------------------------------- */
