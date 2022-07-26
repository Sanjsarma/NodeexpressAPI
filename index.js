const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const conn=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'student'
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
const app=express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs');

app.get('/display',(req,res)=>{
    var sql='select * from stud';

    conn.query(sql,(err,data)=>{
        if(err) throw err;
        // res.send(data);
        res.render('display',{studentData:data});
    });
});

app.get('/form',(req,res)=>{
   res.render('form');
})
app.get('/display/:rno',(req,res)=>{
   console.log(req.params.rno);
})

app.post('/insert',urlencodedParser,(req,res)=>{
    console.log(req.body);
    console.log(req.body.rno);
    var rollnum=req.body.rno;
   console.log(rollnum);
   var newname=req.body.name;

    var sql='insert into stud values(?,?)';
    var insertitems=[rollnum,newname];
    conn.query(sql,insertitems,(err,data)=>{
    if(err) throw err;
     console.log(data);
    res.redirect('/display');
   });
});

app.listen(5000, function(){
    console.log('listening...') });
