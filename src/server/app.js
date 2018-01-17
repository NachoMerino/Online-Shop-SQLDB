const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const mailnotifier = require('./mailnotifer');
const jwt = require('jsonwebtoken');
const serverSignature = 'Super_Secret_Signature';
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
app.set('view engine', 'ejs');
const Router = express.Router;

const port = 9090;

let osFolder = process.env.HOME + '/.online_shop';
let shopConfig = null;
if (!fs.existsSync(osFolder)) {
  fs.mkdirSync(osFolder);
  let initialConfig = {
    mysql_user: '',
    mysql_db: '',
    mysql_pwd: '',
    mailnotifications: '0',
  }
  fs.writeFileSync(osFolder + '/.config.json', JSON.stringify(initialConfig));
  console.log('The config folder does not exist, it has been created now. The server will exit now');
  process.exit();

} else {
  shopConfig = require(osFolder + '/.config.json');
}


const con = mysql.createConnection({
  host: 'localhost',
  user: shopConfig.mysql_user,
  password: shopConfig.mysql_pwd,
  database: shopConfig.mysql_db,
});

const frontendDirectoryPath = path.resolve(__dirname, './../static');

console.info('Static resource on: ', frontendDirectoryPath);
app.use(bodyParser.json());

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

///Conect to MySQL
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
apiRouter.get('/activecustomers', (req, res) => {
  con.query('select id from customers where active = 1 ', (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
});

apiRouter.get('/customers/:userid', (req, res) => {
  con.query('select * from customers where active = 1 and id = ?', [req.params.userid], (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
});

apiRouter.get('/payment_methods', (req, res) => {
  con.query('SELECT * FROM payment_methods', (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
});

apiRouter.get('/orders', (req, res) => {
  con.query('SELECT * FROM orders', (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  });
});
// login with postman!

apiRouter.post('/login', (req, res) => {
  if (!req.body.email || !req.body.pwd) {
    return res.json({ err: 'Mail and password required' });
  }

  con.query('select * from customers where email = ?', [req.body.email],
    function(err, rows) {
      if (err) {
        throw err;
      }
      if (rows.length > 0 && bcrypt.compareSync(req.body.pwd, rows[0].pwd)) {
        const token = jwt.sign({ email: rows[0].email, pwd: rows[0].pwd }, serverSignature);
        return res.json({
          firstname: rows[0].firstname,
          token: token,
          id: rows[0].id,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          birthdate: rows[0].birthdate,
          email: rows[0].email,
          phone: rows[0].phone,
          city: rows[0].city,
          postal: rows[0].postal,
          street: rows[0].street,
        });
      } else {
        return res.json({ err: 'Mail/Password not found' });
      }
    });
});
// recover password

apiRouter.post('/recover', (req, res) => {
  con.query('select id from customers where email = ?', [req.body.recEmail],
    function(err, rows) {
      if (rows.length === 0) {
        // i think we should not have this
        return res.json({ err: 'The email ' + [req.body.recEmail] + ' does not exist in our DB' });
      } else {
        const rndString = randomstring.generate(20);
        con.query('INSERT INTO passwordreset (code,email,customerID) VALUES (?,?,?)', [rndString,
            req.body.recEmail, rows[0].id,
          ],
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              return res.json({ success: 'Ready to change the pass' });
            }
          });
        // email stuff
        if (shopConfig.mailnotifications === '0') {
          console.log('Sending recover email to:', req.body.recEmail);
          const userEmail = req.body.recEmail;
          const text = `<h1>Proccess to change the password for the account ${req.body.recEmail}</h1>
            <p>This is a linkcode to recover your password:</p>
            <p><a href="http://localhost:5000/resetpassword=${rndString}">CLICK TO RECOVER</p>
            <p>Enjoy your miserable day</p>`;
          const subject = 'Your Password Recover Link';
          mailnotifier.sendMail(userEmail, subject, text);
        }
      }
    });
});


// postUser.sh
apiRouter.post('/register', (req, res) => {
  con.query('select email from customers where email = ?', [req.body.email],
    function(err, rows) {
      if (err)
        throw res.json();
      if (rows.length > 0) {
        return res.json({ err: 'The email ' + [req.body.email] + ' its already in use.' });
      } else {
        const rndString = randomstring.generate(20);
        bcrypt.hash(req.body.pwd, 0, (err, pwdHash) => {
          con.query('INSERT INTO customers (firstname,lastname,birthdate,phone,city,street,postal,email,pwd,activationcode) VALUES (?,?,?,?,?,?,?,?,?,?)', [req.body.firstname,
              req.body.lastname,
              req.body.birthdate,
              req.body.phone,
              req.body.city,
              req.body.street,
              req.body.postal,
              req.body.email,
              pwdHash,
              rndString,
            ],
            (err, rows) => {
              if (err) {
                throw err;
              } else {
                return res.json({
                  firstname: req.body.firstname,
                  token: req.body.pwd,
                  id: rows.insertId,
                  birthdate: req.body.birthdate,
                  lastname: req.body.lastname,
                  email: req.body.email,
                  phone: req.body.phone,
                  city: req.body.city,
                  postal: req.body.postal,
                  street: req.body.street,
                });
              }
            });
          // email stuff
          if (shopConfig.mailnotifications === '0') {
            const userEmail = req.body.email;
            const text = `<h1>Thank you ${req.body.firstname} ${req.body.lastname}</h1>
            <p>This is a linkcode to activate your account:</p>
            <p><a href="http://localhost:5000/activate=${rndString}">CLICK TO ACTIVATE</p>
            <p>Enjoy your miserable day</p>`;
            const subject = 'Your Activation Link';
            mailnotifier.sendMail(userEmail, subject, text);
          }
        })
      }
    });
});

apiRouter.put('/activate/:activecode', (req, res) => {
  con.query('UPDATE customers set active = 1 where activationcode = ?', [req.params.activecode],
    (err, rows) => {
      if (rows.affectedRows === 0) {
        return res.json({ err: 'Your Code is not valid.' });
      }
      return res.json(rows);

    });
});

apiRouter.put('/passwordreset/:passwordresetcode', (req, res) => {
  con.query('UPDATE passwordreset set reset = now() where code = ?', [req.params.passwordresetcode],
    (err, rows) => {
      if (rows.affectedRows === 0) {
        return res.json({ err: 'Your Code is not valid.' });
      }
      bcrypt.hash(req.body.newPassword, 0, (err, pwdHash) => {
        con.query('select customerID from passwordreset where code = ?', [req.params.passwordresetcode],
          (err, rows) => {
            con.query('UPDATE customers set pwd = ? where id = ?', [pwdHash, rows[0].customerID],
              (err, rows) => {
                return res.json('Password successfully Changed');
              });
          });
      });
    });
});


function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.render('nopass', {
      status: 403
    });
    // res.sendStatus(403);
  }
}

function isAuthorized(req, res, next) {
  jwt.verify(req.token, serverSignature, (err, data) => {
    if (err) {
      return res.json({ err: 'YOU SHALL NOT PASS!!!! --"Gandalf"' });
    } else {
      next();
    }
  });
}

//postOrder.sh
apiRouter.post('/order', ensureToken, isAuthorized, (req, res) => {
  console.log('we are on /order');
  con.query('INSERT INTO orders (customer_id,created,payment_method_id) VALUES (?,now(),?)', [req.body.user.customer_id, req.body.payment_method_id],
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        const orderID = rows.insertId;
        let sql = 'INSERT INTO order_details (order_id,product_id,price) VALUES ';
        for (let i = 0; i < req.body.products.length; i += 1) {
          const p = req.body.products[i];
          let values = '(' + orderID + ',' + p.id + ',' + p.price + ')';
          sql += values;
          if (i < req.body.products.length - 1) {
            sql += ','
          }
        }
        con.query(sql, (err, rows) => {
          if (shopConfig.mailnotifications === '0') {
            // email stuff
            const text = `<h1>Thank you ${req.body.user.name}</h1>
            <p>You need to pay ${req.body.total_price} Euros.</p>
            <p>Enjoy your miserable day</p>`;
            const subject = 'Your Shopping list';
            console.log('sending email to customer');
            mailnotifier.sendMail(req.body.user.customer_email, subject, text);
          }
          return res.json(rows);
        });
      }
    });
});

// modifyUser.sh
apiRouter.put('/user/:userid', (req, res) => {
  con.query('select pwd from customers where id = ?', [req.params.userid],
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0 && bcrypt.compareSync(req.body.oldPwd, rows[0].pwd)) {
        delete req.body.oldPwd;
        var sql = 'UPDATE customers set ';
        // console.info('user id: ', req.params.userid);
        var i = 1;
        var bodyLength = Object.keys(req.body).length;
        var values = [];
        for (var field in req.body) {
          console.log('the field is:', field);
          if (field == 'pwd') {
            sql += field + ' = ?';
            if (i < bodyLength)
              sql += ',';
            i++;
            const pwdhash = bcrypt.hashSync(req.body.pwd, 0);
            values.push(pwdhash);
          } else {
            sql += field + ' = ?';
            if (i < bodyLength)
              sql += ',';
            i++;
            values.push(req.body[field]);
          }

          // console.info('field is:',field);
          // console.info('value is:',req.body[field]);
        }
        sql += 'where id = ?';
        values.push(req.params.userid);
        console.log('sql', sql);
        console.log('values', values);
        con.query(sql, values,
          (err, rows) => {
            if (err)
              throw err;
            console.log(rows);
            return res.json({
              firstname: req.body.firstname,
              token: req.body.pwd,
              id: req.params.userid,
              birthdate: req.body.birthdate,
              lastname: req.body.lastname,
              email: req.body.email,
              phone: req.body.phone,
              city: req.body.city,
              postal: req.body.postal,
              street: req.body.street,
            });
          });
      } else {
        return res.json({ err: 'Password is not correct' });
      }
    });
});
/* WORKING
apiRouter.put('/user/:userid', (req, res) => {
  var sql = 'UPDATE customers set ';
  // console.info('user id: ', req.params.userid);
  var i = 1;
  var bodyLength = Object.keys(req.body).length;
  var values = [];
  for (var field in req.body) {
    sql += field + ' = ?';
    if (i < bodyLength)
      sql += ',';
    i++;
    values.push(req.body[field]);
    // console.info('field is:',field);
    // console.info('value is:',req.body[field]);
  }
  sql += 'where id = ?';
  values.push(req.params.userid);
  con.query(sql, values,
    (err, rows) => {
      if (err)
        throw err;
      console.log(rows);
      return res.json({
        firstname: req.body.firstname,
        token: req.body.pwd,
        id: req.params.userid,
        birthdate: req.body.birthdate,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        postal: req.body.postal,
        street: req.body.street,
      });
    });
});
*/
apiRouter.delete('/delete/:userid', (req, res) => {
  con.query('UPDATE customers set deleted = now() where id = ?', [req.params.userid],
    (err, rows) => {
      if (err)
        throw err;
      res.json(rows);
    });
});

apiRouter.get("*", (req, res) => {
  res.send('404 Sorry we couldnt find what you requested');
});

app.listen(port, (err) => {
  if (err) throw err;
  console.info('Server started on port', port);
});
