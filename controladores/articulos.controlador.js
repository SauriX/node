
const Articulo= require("../modelos/articulos.modelo");

/* get */

let mostrarArticulo=(req,res)=>{
    Articulo.find({}).exec((err,data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje:"error"
            });
        }
        Articulo.countDocuments({},(err,total)=>{
            if(err){
                return res.json({
                    status:500,
                    mensaje:"error"
                });
            }
            res.json({
                status:200,
                total,
                data
            });
        });
    });
 }
 /* post */
(req,res)=>{
     let Articulo = req.body;

     res.json({
         Articulo
     });
 }
 /* put*/
(req,res)=>{
    let id = req.params.id;

    res.json({
       id
    });
};
 /* delete */
(req,res)=>{
    let id = req.params.id;

    res.json({
       id
    });
};

module.exports={
    mostrarArticulo
}