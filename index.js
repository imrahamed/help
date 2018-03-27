const Sequelize = require('sequelize');
var mysql = require('mysql');
const express = require('express')
const app = express();
var cors = require('cors');
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'alpha19',
    database : 'mydb'
  });
const sequelize = new Sequelize('mydb', 'root', 'alpha19', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.get('/', (req, res) => res.send('Hello World!'));

  app.post('/articles', (req, res) => {
    console.log(req.body)
    connection.query("INSERT INTO ARTICLE SET ? ", req.body,
        () => {
            console.log('inserted');
        },
        (err) => {
            console.log(err);
            
        }
    )
    res.end("success");
  })

app.listen(3005, () => console.log('Example app listening on port 3000!'))