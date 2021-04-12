const express = require('express')
const app = express()
const conexion = require("./conexion.js");
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Entidad usuarios

//Ruta para obtener los usuarios
app.get("/user", function(req, res){
  const sql = 'select * from t001_usuarios'
  conexion.query(sql,(error, results)=>{
    if(error){
      console.error('error : ' + err.stack);
    }

    if(results.length > 0){
      res.json(results);
    }
    else{
      res.send('No hay resultados');
    }
  });
});

//Ruta para insertar usuarios 
app.post("/user", function(req, res){
  console.log(req.body);

  const sql = 'insert into t001_usuarios (PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, SEXO, TIPO_DOCUMENTO,NUMERO_DOCUMENTO,CORREO_ELECTRONICO,CELUAR, PASSWORD, T003_ROLES_ID_ROL) values ?'

  var values = [
    [req.body.primer_nombre, req.body.primer_apellido, req.body.primer_apellido, req.body.segundo_apellido, req.body.sexo, req.body.tipo_documento, req.body.numero_documento, req.body.correo_electronico, req.body.celular, req.body.password, req.body.id_rol ]
  ]


  conexion.query(sql,[values],(error, results)=>{

    if (error) {
      throw error;
      res.send("Error");
    };
    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
})

//Ruta para editar usuario
app.put('/user', function (req, res) {
  const sql = "update t001_usuarios set PRIMER_NOMBRE='"+req.body.primer_nombre+
  "',SEGUNDO_NOMBRE='"+ req.body.segundo_nombre+
  "',PRIMER_APELLIDO='"+ req.body.primer_apellido+
  "',SEGUNDO_APELLIDO='"+ req.body.segundo_apellido+
  "',SEXO='"+ req.body.sexo+
  "',TIPO_DOCUMENTO='"+ req.body.tipo_documento+
  "',NUMERO_DOCUMENTO='"+ req.body.numero_documento+
  "',CORREO_ELECTRONICO='"+ req.body.correo_electronico+
  "',CELUAR='"+ req.body.celular+
  "',PASSWORD='"+ req.body.password+
  "',T003_ROLES_ID_ROL='"+ req.body.id_rol+
  "' where ID_USUARIO ="+req.body.id
  /*var values = [
    [req.body.name, req.body.numero_documento, req.body.tipo_documento, req.body.sexo, req.body.nacionalidad, req.body.telefono, req.body.direccion_residencia, req.body.contrasena, req.body.id]
  ]*/
  conexion.query(sql,(error, results)=>{
    if (error) throw error;

    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
}); 

//Ruta para remover usuario
app.delete('/user', function (req, res) {
  const sql = "delete from t001_usuarios where ID_USUARIO ="+req.body.id
  
  conexion.query(sql,(error, results)=>{
    if (error) throw error;
    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
}); 


//Entidad sedes

//Ruta para obtener las sedes
app.get("/sedes", function(req, res){
  const sql = 'select * from t005_sedes'
  conexion.query(sql,(error, results)=>{
    if(error){
      console.error('error : ' + err.stack);
    }

    if(results.length > 0){
      res.json(results);
    }
    else{
      res.send('No hay resultados');
    }
  });
});

//Ruta para insertar sedes 
app.post("/sedes", function(req, res){
  console.log(req.body);

  const sql = 'insert into t005_sedes (ESTADO, NOMBRE_SEDE, LATITUD, LONGITUD, ID_CIUDAD, ID_USUARIO,T001_USUARIOS_ID_USUARIO) values ?'

  var values = [
    [req.body.estado, req.body.nombre_sede, req.body.latitud, req.body.longitud, req.body.id_ciudad, req.body.id_usuario, req.body.id_usuario_foranea]
  ]


  conexion.query(sql,[values],(error, results)=>{

    if (error) {
      throw error;
      res.send("Error");
    };
    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
})

//Ruta para editar usuario
app.put('/sedes', function (req, res) {
  //const sql = "update usuarios set nombre=?, numero_documento=?, tipo_documento=?, sexo=?, nacionalidad=?,telefono=?,direccion_residencia=? where id =?"
  const sql = "update t005_sedes set ESTADO='"+req.body.estado+
  "',NOMBRE_SEDE='"+ req.body.nombre_sede+
  "',LATITUD='"+ req.body.latitud+
  "',LONGITUD='"+ req.body.longitud+
  "',ID_CIUDAD='"+ req.body.id_ciudad+
  "',ID_USUARIO='"+ req.body.id_usuario+
  "',T001_USUARIOS_ID_USUARIO='"+ req.body.id_usuario_foranea+
  "' where ID_SEDE ="+req.body.id_sede
  
  conexion.query(sql,(error, results)=>{
    if (error) throw error;
    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
}); 

//Ruta para remover sede
app.delete('/sedes', function (req, res) {
  const sql = "delete from t005_sedes where ID_SEDE ="+req.body.id_sede
  
  conexion.query(sql,(error, results)=>{
    if (error) throw error;
    res.send("Exito");
    console.log("Number of records inserted: " + results.affectedRows);

  });
}); 

app.listen(port, () => {
  console.log('Servidor corriendo')
})