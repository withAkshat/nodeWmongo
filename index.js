const express = require('express');
const app = express();
app.listen( 8080);

// -----------------------------------------------------------------------------------------

const path = require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
// -----------------------------------------------------------------------------------------

let methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))

// -----------------------------------------------------------------------------------------

const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WhatsApp')
}

main()
.then((res) => {
    console.log("Connection is Working");

})
.catch((err) => {
    console.log(err);

});

const Chat = require("./models/chats.js");
// -----------------------------------------------------------------------------------------

// Index Route 
app.get("/chats", async (req,res)=>{

    let chats = await Chat.find();
    
    console.log(chats)
    res.render("index.ejs", { chats });
    
    

})

// New Chat

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

// Create Chat

app.post("/chats",(req,res)=>{
    let { from, to,msg } = req.body;

    let newChat = new Chat({
        from: from,
        msg:msg,
        to:to,
        created_to: new Date(),
    })

    newChat.save()
    .then((res)=>{
        console.log(res);
        
    }).catch((err)=>{
        console.log(err);
        
    })

    res.redirect("/chats")
})

// --------------------------------------------------------------------------------------------

app.get("/",(req,res)=>{
    res.send("everthing fine")
})

