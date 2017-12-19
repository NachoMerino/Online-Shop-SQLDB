const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const Router = express.Router;

const port = 9090;

const con = mysql.createConnection({
  host: 'localhost',
  user: 'nacho',
  password: 'qwerty',
  database: 'online_shop'
});

const frontendDirectoryPath = path.resolve(__dirname, './../static');

console.info('Static resource on: ', frontendDirectoryPath);

app.use(express.static(frontendDirectoryPath));
// CORS on ExpressJS to go over the port limitations on the same machine
app.use(cors());
/*Old fashion way
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
// always want to have /api in the begining

const apiRouter = new Router();
app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
  res.send({ 'shop-api': '1.0' });
});

///MySQL START
apiRouter.get('/products', (req, res) => {
  con.query('select * from products', (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.type('json');
      res.send(rows);
    }
  });
});

apiRouter.get('/categories', (req, res) => {
  con.query('select * from product_categories', (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.type('json');
      res.send(rows);
    }
  });
});
///MySQL END
/*Old fashion way
apiRouter.get('/products', (req, res) => {
  fs.readFile(frontendDirectoryPath + '/products.json',
    (err, content) => {
      if (err) throw err;
      res.type('json');
      res.send(content);
    });
});

apiRouter.get('/categories', (req, res) => {
  fs.readFile(frontendDirectoryPath + '/categories.json',
    (err, content) => {
      if (err) throw err;
      res.type('json');
      res.send(content);
    });
});
*/
app.get("*", (req, res) => {
  res.send('404 Sorry we couldnt find what you requested');
});

app.listen(port, (err) => {
  if (err) throw err;
  console.info('Server started on port', port);
});
