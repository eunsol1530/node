const express=require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

module.exports=function (){
    var router=express.Router();
    router.use(limiter); // Apply rate limiting to all routes
    router.get('/', (req, res)=>{
        if(req.session.name == undefined){
            res.render('login.html');
        }else{
            res.render('index.html');
        }
    });
    return router;
};
