const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( { extended: true } ));

app.listen(port, () => {
  console.log("== Server is running on port ", port);
});

app.use(express.static('public'));

const mysqlHost = process.env.MYSQL_HOST;
const mysqlPort = process.env.MYSQL_PORT || '3306';
const mysqlDBName = process.env.MYSQL_DATABASE;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const maxMySQLConnections = 10;
app.locals.mysqlPool = mysql.createPool({
  connectionLimit: maxMySQLConnections,
  host: mysqlHost,
  port: mysqlPort,
  database: mysqlDBName,
  user: mysqlUser,
  password: mysqlPassword
});

app.get('/', (req, res, next) => {
  console.log(`Listening on port ${port}`);
  res.redirect('/index.html');
});

app.post('/send', (req, res, next) => {
  const mysqlpool = req.app.locals.mysqlPool;
  uname = req.body.username;
  pwd = req.body.password;
  checkLogin(mysqlpool, uname, pwd)
    .then((results) => {
      if (!(results.username == null)) {
        res.status(200).json(results);
      } else {
        res.status(401).json({
          err: "Invalid username or password",
          sqlData: results
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "The database died."
      });
    });
});

function checkLogin (mysqlpool, uname, pwd) {
  return new Promise((resolve, reject) => {
    var sqlString = "SELECT * FROM users WHERE username='" + uname + "' AND password='" + pwd + "'";
    mysqlpool.query(sqlString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results[0]){
          var resultsObj = {
            username: results[0].username,
            password: results[0].password,
            secret: results[0].secret,
            sqlString: sqlString
          };
        } else {
          resultsObj = {
            username: null,
            sqlString: sqlString
          };
        }
        resolve(resultsObj);
      }
    });
  });
}

app.get('*', function(req, res) {
  res.status(404);
});
