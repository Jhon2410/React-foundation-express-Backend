const router =  require('express').Router();
const biblioteca = require('../db/Schemas/biblioteca');


router.get('/',(req,res)=>{
    let resultados = []
    biblioteca.find({})
    .then((data)=>{
        if(data.length!=0){
            data.map(n=>{
                console.log(n)
                resultados.push({_id:n._id, nombre : n.nombre, documento :  n.documento ,  role : n.role , estado : n.estado })
            })
            res.json({
                respuesta : resultados
            })
           
        }else{
            res.json("{res : 'No Hay resultados'}")
        }
    })
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })

})


// obtener libros
router.get('/libros',(req,res)=>{
res.json("Todo los libros ")
})


// crear un libro
router.get('/crear',(req,res)=>{
    const nuevoLibro = biblioteca({})
    nuevoLibro.save()
    res.json(" crear un libro")
})

// borrar un libros 
router.delete('/libros',(req,res)=>{
    res.json("Eliminar un libro")
})

// actualizar un libros
router.put('/libros',(req,res)=>{
    res.json("Actualizar libros")
})





module.exports = router;