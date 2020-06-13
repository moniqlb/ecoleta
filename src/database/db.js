//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() //ver mensagens no terminal = verbose

//criar/iniciar/instanciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db") //classe/construtor

module.exports = db

//utilizar o objeto de banco de dados para nossas operações
// db.serialize( () => {

//   //criar tabela com comandos SQL
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXET,
//       items TEXT
//     );
//   `)

//   //inserir dados na tabela
//   const query = `
//     INSERT INTO places (
//       image,
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?,?,?,?,?,?,?);
//   `
//   const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "Nº 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas"
//   ]
  
//   function afterInsertData(err) {
//     if(err) {
//       return console.log(err)
//     }
//     console.log("Cadastro-OK")
//     console.log(this)
//   }

//   //db.run(query, values, afterInsertData)

//   //consultar dados da tabela
//   db.all(`SELECT * FROM places`, function (err, rows){
//     if(err) {
//       return console.log(err)
//     }
//     console.log("Seus registros: ")
//     console.log(rows)
//   })

//   //deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [12], function (err) {
//       if(err) {
//         return console.log(err)
//       }
//       console.log("Deletado!")
//     })
// })

