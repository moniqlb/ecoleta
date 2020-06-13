const express = require("express")
const server = express()

//pegando o banco de dados
const db = require("./database/db")

//configurando a pasta public
server.use(express.static("public"))
/*Como eu criei uma pasta public e coloquei as demais pastas do front dentro,
preciso informar, criando uma rota apa*/

//habilitar o uso do req body na application
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks") //chamando o nunjucks
nunjucks.configure("src/views", { /*o meu nunjucks vai mexer nas viwes*/
  express: server, /*O servidor é o express */
  noCache: true /*e não quero chache */
})

//Caminho da aplicação
server.get("/", (req, res) => {
  return res.render("index.html") //o nunjucks está renderizando pela config (já tem o caminho)
})

server.get("/create-point", (req, res) => {

  //req.query - Query Strings da nossa url
  console.log(req.query)

  return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
  
  //rqe.body - corpo do formulario
  console.log(req.body)

  // inserir dados no banco de dados
  // inserir dados na tabela
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
      return res.send("Erro no Cadastro!")
    }
    console.log("Cadastro-OK")
    console.log(this)
    
    res.render("create-point.html", {saved: true})
  }
  
  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == ""){
    //pesquisa vazia é total =0
    return res.render("search-results.html", { total: 0})
  }

  // pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows){
    // TRago tudo da tabela places quando a cidade for igual ao que foi digitado no
    // campo search. Coloquei entre 'aspas simples' pqe estou enviando para o banco uma string
    if(err) {
      return console.log(err)
    }
    console.log("Seus registros: ")
    console.log(rows)

    const total = rows.length
    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total})
  })

})

//ligar o servidor
server.listen(3000)

