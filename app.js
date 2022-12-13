const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
//serving staaic file
app.use("/static", express.static("static"));
app.use(express.urlencoded());
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//set the templets engine at pug
app.set("view engine", "pug");
//set viwes directry

app.set("views", path.join(__dirname, "views"));

var db = require("./backned.js");
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.get("/ticket", (req, res) => {
  res.render("Ticket.pug");
});
app.get("/update", (req, res) => {
  res.render("Update.pug");
});
app.get("/delete", (req, res) => {
  res.render("Delete.pug");
});
app.post("/insert", function (req, res) {
  var t_id = req.body.t_id;
  var t_date = req.body.t_date;
  var t_amount = req.body.t_amount;
  var p_id = req.body.p_id;

  var sql = `INSERT INTO ticket(t_id,t_date,t_amount,p_id) VALUES ("${t_id}", "${t_date}", "${t_amount}", "${p_id}")`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.render("index.pug");
  });
});
app.post("/view", function (req, res) {
  var sql = `Select *from ticket`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    res.render("view.ejs", { data: result });
  });
});
app.post("/delete", function (req, res) {
  var id = req.body.t_id;
  var sql = `delete  from ticket where t_id =${id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Deleted Row(s):", result.affectedRows);
    res.send(`Deleted Row(s):${result.affectedRows}`);
  });
});
app.post("/updatet_id", function (req, res) {
  var prv = req.body.prv;
  var set = req.body.set;
  var sql = ` update ticket set t_id=${set} where t_id =${prv} `;
  db.query(sql, function (err, result) {
    if (err) throw err;

    res.send(`updated ticket_id :${prv} to : ${set}`);
  });
});
app.post("/updatet_date", function (req, res) {
  var prv = req.body.prv;
  var set = req.body.set;
  console.log(prv);
  console.log(set);
  var sql = ` update ticket set t_date="${set}" where t_date ="${prv}" `;
  db.query(sql, function (err, result) {
    if (err) throw err;

    res.send(`updated ticket_date :${prv} to : ${set}`);
  });
});
app.post("/updatet_amt", function (req, res) {
  var prv = req.body.prv;
  var set = req.body.set;
  var sql = ` update ticket set t_amount=${set} where t_amount =${prv} `;
  db.query(sql, function (err, result) {
    if (err) throw err;

    res.send(`updated ticket_amt :${prv} to : ${set}`);
  });
});
app.post("/updatet_pass", function (req, res) {
  var prv = req.body.prv;
  var set = req.body.set;
  var sql = ` update ticket set p_id=${set} where p_id =${prv} `;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(`updated pass_id :${prv} to : ${set}`);
  });
});
app.post("/exports", function (req, res) {
  var file = req.body.set;
  console.log(file);
  exp_q = `SELECT * from ticket 
  INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}'
  FIELDS ENCLOSED BY '"'
  TERMINATED BY ';'
  ESCAPED BY '"'
  LINES TERMINATED BY '\r\n'
  `;
  db.query(exp_q, function (err, result) {
    if (err) throw err;
    else {
      res.send(
        `Successfully exported to C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}🥳🥳🥳🥳 `
      );
    }
  });
});
app.post("/import", function (req, res) {
  var file = req.body.set;
  console.log(file);
  exp_q = `SELECT * from ticket 
  INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}'
  FIELDS ENCLOSED BY '"'
  TERMINATED BY ';'
  ESCAPED BY '"'
  LINES TERMINATED BY '\r\n' 
  `;
  db.query(exp_q, function (err, result) {
    if (err) throw err;
    else {
      res.send(
        `Successfully exported to C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}🥳🥳🥳🥳 `
      );
    }
  });
});

app.listen(port, () => {
  console.log(` app is  listening on port ${port}`);
});
