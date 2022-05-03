const router = require("express").Router();
const biblioteca = require("../db/Schemas/biblioteca");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join("public/img"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage, dest: path.join("/public/img") });

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
router.post("/crear", upload.single("caratula"), (req, res) => {
  const { titulo, descripcion, contenido } = req.body;
  const caratula = req.file.filename;
  console.log(caratula)
  const nuevoLibro = biblioteca({ titulo, caratula, descripcion });
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
