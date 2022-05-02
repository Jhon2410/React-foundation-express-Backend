const db = require('../mongo')


const bibliotecaSchema = db.Schema({
libros : Array
})

const biblioteca = db.model("biblioteca", bibliotecaSchema)

module.exports = biblioteca;