const router = require("express").Router();
const biblioteca = require("../db/Schemas/biblioteca");

router.get("/", (req, res) => {
  biblioteca
    .find({})
    .then((data) => {
      res.json({
        respuesta: data
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ respuesta: "error " });
    });
});

// obtener un libros
router.get("/libros", (req, res) => {
  res.json("Todo los libros ");
});

// crear un libro
router.get("/crear", (req, res) => {
  const {titulo, caratula , descripcion , contenido} =  req.body;
  const nuevoLibro = biblioteca({titulo, caratula, descripcion, contenido});
  nuevoLibro.save();
  biblioteca
    .find({})
    .then((data) => {
      res.json({
        respuesta: data
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ respuesta: "error " });
    });
});

// borrar un libros
router.delete("/libros", (req, res) => {
  res.json("Eliminar un libro");
});

// actualizar un libros
router.put("/libros", (req, res) => {
  res.json("Actualizar libros");
});

module.exports = router;
