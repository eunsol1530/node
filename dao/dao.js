const express=require('express');
var util = require('util');
module.exports=function (){
    var router=express.Router();
    router.get('/lod', (req, res)=>{
        var id = req.session.id;

        var mysql = require('mysql') ;
        var connection = mysql.createConnection({
            host : process.env.DB_HOST || 'localhost' ,
            user : process.env.DB_USER || 'root' ,
            password : process.env.DB_PASSWORD || 'root' ,
            database : process.env.DB_NAME || 'daka'
        });

        var selectSql = 'select * from time where id = ?' ;
        connection.query(selectSql,[id],function(err,cb){
            if (err) {
                res.status(500).send('Database query error').end();
                return;
            }
            if(cb.length > 0){
                res.json(cb).end();
            } else {
                res.status(404).send('No data found').end();
            }
        })
        connection.end();

    });
    router.get('/add', (req, res)=>{
        var id = req.session.id;
        var length = req.param('length');
        var time = req.param('time');
        var mysql = require('mysql') ;
        var connection = mysql.createConnection({
            host : process.env.DB_HOST || 'localhost' ,
            user : process.env.DB_USER || 'root' ,
            password : process.env.DB_PASSWORD || 'root' ,
            database : process.env.DB_NAME || 'daka'
        });

        var selectSql = 'insert into time values(?,?,?)' ;
        connection.query(selectSql,[time,length,id],function(err,cb){
            if(!err){
                console.log('ssssssssss');
                var na = {type:true};
                res.json(na).end();
            } else {
                res.status(500).send('Database insertion error').end();
            }
        })
        connection.end();

    });
    router.get('/', (req, res)=>{
        console.log(89787897897879879879);
        var user = req.param('user');
        var pwd = req.param('pwd');

        var mysql = require('mysql') ;
        var connection = mysql.createConnection({
            host : process.env.DB_HOST || 'localhost' ,
            user : process.env.DB_USER || 'root' ,
            password : process.env.DB_PASSWORD || 'root' ,
            database : process.env.DB_NAME || 'daka'
        });

        var selectSql = 'select * from user where user = ? and pwd = ?' ;
        connection.query(selectSql,[user,pwd],function(err,cb){
            if (err) {
                res.status(500).send('Database query error').end();
                return;
            }
            if(cb.length > 0){
                var data = JSON.parse(util.format('%j',cb[0]));
                req.session.id = data.id;
                res.render('index.html');
            } else {
                res.status(401).send('Unauthorized').end();
            }
        })
        connection.end();
    });

    return router;
};
