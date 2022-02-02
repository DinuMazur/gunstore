// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require('md5')

// Server port
var HTTP_PORT = 8000

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors({origin: '*'}));
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
    console.log("http://localhost:%PORT%".replace("%PORT%",HTTP_PORT))
});


app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// app.get("/users/:id", (req, res, next) => {
//     var sql = "select * from user where id = ?"
//     var params = [req.params.id]
//     db.get(sql, params, (err, row) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":row
//         })
//       });
// });

// app.get("/users", (req, res, next) => {
//     var sql = "select * from user"
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// });

app.get("/products", (req, res, next) => {
    var sql = "select * from weapons"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/products/sort=:column", (req, res, next) => {
    var sql = "select * from weapons order by " + req.params.column + " DESC";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/products/info=:id", (req, res, next) => {
    var sql = "select * from weapons w\
            LEFT JOIN manufacturers m\
            On m.manufacturer = w.manufacturer where w.id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/users/", (req, res, next) => {
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [req.body.username, "data.email", md5(req.body.password)]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "id" : this.lastID
        })
    });
});

app.post("/cart/", (req, res, next) => {
    var sql = 'INSERT INTO cart (user_id, product_id) VALUES (?,?)'
    var params = [req.body.user_id, req.body.product_id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "id" : this.lastID
        })
    });
});

app.get("/cart/info=:id", (req, res, next) => {
    var sql = "select * from cart where user_id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/users/username=:user&password=:pass", (req, res, next) => {
    var sql = "select * from user where name = ? and password = ?";
    var params = [req.params.user, md5(req.params.pass)]
    db.get(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
