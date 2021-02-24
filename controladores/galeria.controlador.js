
const Galeria= require("../modelos/galeria.modelo");

/* get */

let mostrarGaleria=(req,res)=>{
    Galeria.find({}).exec((err,data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje:"error"
            });
        }
        Galeria.countDocuments({},(err,total)=>{
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
     let Galeria = req.body;

     res.json({
         Galeria
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
    mostrarGaleria
}