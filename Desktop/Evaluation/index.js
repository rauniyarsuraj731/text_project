 const express = require("express");

 const app = express();


 app.use(logger);
 app.use(checkPermission);

 app.get("/books",function(req,res){
    return res.send({route:"/books"})
 })

 

 app.get("/libraries",checkPermission,function(req,res){
    res.send({route:"/libraries",permission:true})
})

app.get("/authors",checkPermission,function(req,res){
    res.send({route:"/authors",permission:true})
})

app.listen(2700,()=>{
    console.log("consoled sucessfully") 
})

function logger(req,res,next){
    // console.log("logger working successfully");
    if(req.path === "/books"){
        // console.log("/books")
        req.role = "books"
    }
    else if(req.path === "/libraries"){
        // console.log("/libraries")
        req.role = " libraries"
    }
    else if(req.path === "/authors"){
        // console.log("/authors")
        req.role="authors"
    }
    else{
        // console.log("unknown server")
        req.role="unknown server"
    }
    next()
}

function checkPermission(req,res,next){
    if(req.path === "/libraries"){
        req.role = "permission:true"
    }
    else if(req.path === "/authors"){
        req.role = "permission:true"
    }
    else{
        req.role="unknown server"
    }
    next()
}