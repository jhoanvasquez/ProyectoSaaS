//MySql
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bdsaasgeo',
    password: '',
  });


//Error connection
connection.connect(function(err) {
  
  if(err){
    console.error('error : ' + err.stack);
  }
  
});
  
module.exports = connection;