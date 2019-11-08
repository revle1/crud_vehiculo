const express = require('express');
const app = express();
const vehiculos = require("models/vehiculosM");

app.get('/', function (req, res) {
    res.json({
        'exito': true,
        'mensage':'Bienvenido Al crud de Vehiculo',
        'datos' : []
     })
  });
  
  //listar vehiculos
app.get('/vehiculos', function (req, res) {

vehiculos.find({})
        .exec((err, vehiculosList) =>{
            if(err){
            return res.status(400).json({
                 'exito': false,
                 'mensage':'error',
                 'datos' : []

                 });
             }
             return res.json({
                'exito': true,
                'mensage':'Lista de vehiculo',
                'datos' :[vehiculosList] 
                })
         });

    });

    //Guardar 
app.post('/vehiculos', function (req, res) {
    let datos = req.body;
    
    let vehiculos = new vehiculos({
        placa: datos.placa,
        marca: datos.marca,
        modelo: datos.modelo,
        precio: datos.precio,
        codigo: datos.codigo,
    });

     vehiculos.save( (err, vehiculosBD) =>{
        if(err){
            return res.status(400).json({
                 'exito': false,
                 'mensage':'error',
                 'datos' : []

                 });
             }
             return res.json({
                'exito': true,
                'mensage':'Guardar producto',
                'datos' : [vehiculosBD]
                })

         }); 
 });

 //consultar por Id
app.get('/vehiculo/:id', function (req, res){
    let id = req.params.id;

    vehiculos.findById(id)
        .exec((err, vehiculosList) =>{
            if(err){
            return res.status(400).json({
                 'exito': false,
                 'mensage':'error',
                 'datos' : []

                 });
             }
             return res.json({
                'exito': true,
                'mensage':'Auto encontrado',
                'datos' : [vehiculosBD]
                })
         });

});

//Actualizar
app.put('/vehiculo/:id', function (req, res){
    let id = req.params.id;
    let datos = req.body;
    
     vehiculos.findByIdAndUpdate(id, datos,{new : true , upsert : true, runValidators: true}, (err, vehiculosBD) =>{
        if(err){
            return res.status(400).json({
                 'exito': false,
                 'mensage':'error',
                 'datos' : []

                 });
             }
             return res.json({
                'exito': true,
                'mensage':'Actualizar  producto',
                'datos' : [vehiculosBD]
                })

         });

});

//Elminar
app.delete('/vehiculo/:id', function (req, res){
    let id = req.params.id;
    let datos = {active : false}

    vehiculos.findByIdAndUpdate(id, datos,{new : true , upsert : true, runValidators: true}, (err, vehiculosBD) =>{
        if(err){
            return res.status(400).json({
                 'exito': false,
                 'mensage':err,
                 'datos' : []

                 });
             }
             if(!vehiculosBD){
                 return res.status(400).json({
                     'exito' : false,
                     'mensaje' : 'Producto no se encuentra',
                     'datos' : []
                 });
             }
            
             return res.json({
                'exito': true,
                'mensage':'Producto borrado con exito',
                'datos' : [vehiculosBD]
                })

         });

});


module.exports = app;