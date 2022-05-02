const router =  require('express').Router();
const productos =  require('../db/Schemas/productos');
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


router.get('/libros',(req,res)=>{
res.json("libros")
})


// crear un libro
router.get('/libros',(req,res)=>{
    res.json("libros")
    })

// borrar un libros 

// actualizar un libros





module.exports = router;