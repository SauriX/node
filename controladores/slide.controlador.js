const { json } = require("body-parser");
const Slide = require("../modelos/slide.modelo");
/* administrador de archivos */
const fs = require('fs');

/* get */

let mostrarSlide=(req,res)=>{
    Slide.find({}).exec((err,data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje:"error"
            });
        }
        Slide.countDocuments({},(err,total)=>{
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
let crearSlide=(req,res)=>{
    let body = req.body;
    if(!req.files){
        return res.json({
            status:500,
            mensaje:"error al almacenar el slide",
            err
        });
    }
    let archivo = req.files.archivo;

    /* validar tipo de archivo */
    if(archivo.mimetype != 'image/jpeg' && archivo.mimetype != 'image/png'){
        return res.json({
            status:400,
            mensaje:"la imagen debe ser jpeg o png",
            err
        });
    }
    if(archivo.size > 2000000){
        return res.json({
            status:400,
            mensaje:"la imagen debe inferior a 2mb",
            err
        });
    }
    /* cambiar nombre */
    let nombre = Math.floor(Math.random()*10000);
    /* camputarar la extencion del archivo */
    let extencion = archivo.name.split('.').pop();
    /* movemos el archivo a la carpeta */
    archivo.mv(`./archivos/slide/${ nombre }.${extencion}`,err =>{
        if(err){
            return res.json({
                status:500,
                mensaje:"Error al guardar la imagen",
                err
            });
        }

        let slide = new Slide({
            imagen: `${nombre}.${extencion}`,
            titulo: body.titulo,
            descripcion: body.descripcion
        });
        slide.save((err,data)=>{
            if(err){
                return res.json({
                    status:400,
                    mensaje:"error al almacenar el slide",
                    err
                });
            }
    
            res.json({
                status:200,
                data,
                mensaje: 'el slide fuec reado'
            })
        });
    });
    

}
 /* put*/
let editarSlide=(req,res)=>{
    /* id a actulizar */
    let id = req.params.id;
    /* cuerpo del formulario */
    let body = req.body;

    /* 1-validar que exista el slide */
    Slide.findById(id,(err,data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje:"error en el servidor",
                err
            });
        }

        if(!data){
            return res.json({
                status:404,
                mensaje:"el slide no existe",
               
            });
        }
        let rutaImagen = data.imagen;
        /* validamos cambio de imagen */
        let validarCambioArchivo = (req,rutaImagen) =>{
           return new Promise(
               (resolve,reject)=>{
                    if(req.files){
                        let archivo = req.files.archivo;
                        
                        /* validar tipo de archivo */
                        if(archivo.mimetype != 'image/jpeg' && archivo.mimetype != 'image/png'){
                            
                            let respuesta = {
                                res:res,
                                mensaje:"la imagen debe ser jpeg o png"
                            }
                            reject(respuesta);
                        }
                        if(archivo.size > 2000000){

                            let respuesta = {
                                res:res,
                                mensaje:"la imagen debe inferior a 2mb"
                            }
                            reject(respuesta);
                        }
                        /* cambiar nombre */
                        let nombre = Math.floor(Math.random()*10000);
                        /* camputarar la extencion del archivo */
                        let extencion = archivo.name.split('.').pop();
                        archivo.mv(`./archivos/slide/${nombre}.${extencion}`,err =>{
                            if(err){
                                let respuesta = {
                                    res:res,
                                    mensaje:"error en el servidor"
                                }
                                reject(respuesta);    
                            }
                            /* borramos la antigua imagen  */
                            if(fs.existsSync(`./archivos/slide/${rutaImagen}`)){
                                fs.unlinkSync(`./archivos/slide/${rutaImagen}`);
                                
                            }
                           /*  damos balor  ala nueva imagen */
                            rutaImagen = `${nombre}.${extencion}`;
                           
                            resolve(rutaImagen);
                        });
                    }else{
                        resolve(rutaImagen);
                    }
               });
        }
        /* actualizar registros */
        let cambiarRegistrosBD = (id,body,rutaImagen)=>{
            return  new Promise ((resolve,reject)=>{
                let datosSlide = {
                    imagen:rutaImagen,
                    titulo: body.titulo,
                    descripcion:body.descripcion
                }
                /* actualizamos */
                Slide.findOneAndUpdate(id,datosSlide,{new:true,runValidators:true},(err,data)=>{
                    if(err){
                        let respuesta = {
                            res:res,
                            error:err
                        }
                        reject(respuesta);
                  /*       return res.json({
                            status:500,
                            mensaje:"error al editar el slide",
                            err
                        }); */
                    }
                    let respuesta = {
                        res:res,
                        data:data
                    }
                    resolve(respuesta);
                });
                
            });
        }
        /* sincronisamos las promesas */

        validarCambioArchivo(req,rutaImagen).then(
            rutaImagen => {
                cambiarRegistrosBD(id,body,rutaImagen).then( respuesta =>{
                    respuesta['res'].json({
                        status:200,
                        data: respuesta.data,
                        mensaje:'slide actualizado con exito'
                    });
                }).catch(
                    respuesta => {
                        respuesta['res'].json({
                            status:400,
                            mensaje:respuesta.mensaje
                        });
                    }
                );
                
            }
        ).catch(
            respuesta => {
            respuesta['res'].json({
                status:400,
                mensaje:respuesta.mensaje
            });
        });
    });
};
 /* delete */
let borrarSlide=(req,res)=>{
    /* id a actulizar */
    let id = req.params.id;
    /* VALIDAR ID  */
    Slide.findById(id,(err,data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje:"error en el servidor",
                err
            });
        }

        if(!data){
            return res.json({
                status:404,
                mensaje:"el slide no existe"
               
            });
        }
        //borar archivo
        if(fs.existsSync(`./archivos/slide/${rutaImagen}`)){
            fs.unlinkSync(`./archivos/slide/${rutaImagen}`);
        }    
        Slide.findByIdAndRemove(id,(err,data)=>{
            if(err){
                return res.json({
                    status:500,
                    mensaje:"error en el servidor",
                    err
                });
            }

            return res.json({
                status:200,
                mensaje:"Slide eliminado c0rrectamebnte"
            });
        });
    });
}

module.exports={
    mostrarSlide,
    crearSlide,
    editarSlide,
    borrarSlide
}