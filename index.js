const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files});
    })
})

app.post("/create",(req,res)=>{
console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/");
    })
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err) return res.status(404).send("File not found");
        res.render("file",{filename:req.params.filename,data:data});
    })
})

app.get('/edit/:filename',(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})

app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.prevName}`,`./files/${req.body.newName}`,(err)=>{
        if(err) return res.status(404).send("File not found");
        res.redirect("/");
    })
})

app.listen(3000);