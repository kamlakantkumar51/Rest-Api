const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"Jitendra",
        content:"I love coding!",
        
    },
    {
        id:uuidv4(),
        username:"sarthak",
        content:"hardwork is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"rahul kumar",
        content:"I got selected for my first intership",
    },
    {
        id:uuidv4(),
        username:"Nitish",
        content:"I am interseting in coding and building a business"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});

    res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs",{post}); 
});

app.patch("/posts/:id",(req,res)=>{
     
      let {id} = req.params;
      let newContent = req.body.content;
      let post  = posts.find((p)=> id === p.id);
      if (post) {
          post.content = newContent;
          console.log(post);
      }
      res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post  = posts.find((p)=> id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to the port :8080");
});