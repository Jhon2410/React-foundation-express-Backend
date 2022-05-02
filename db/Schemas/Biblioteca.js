const db = require('../mongo')


const bibliotecaSchema = db.Schema({
titulo : String,
descripcion : String,
imagen : String
})

const biblioteca = db.model("biblioteca", bibliotecaSchema)

module.exports = biblioteca;