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

const ExpressError = require('./ExpressError')

// -------------------------------------------------------------------------------------------
const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/FakeWhatsApp')
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

// Edit Route

app.get("/chats/:id/edit", async (req,res)=>{
    let { id }=req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat })
})

// update route

app.put("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let { msg:newMsg } = req.body;

    let updatedChat =await Chat.findByIdAndUpdate(id, { msg:newMsg }, {runValidators : true, new: true }); 
console.log(updatedChat);

    res.redirect("/chats");
})

// Destroy Route

app.get("/chats/:id/delete", async (req,res)=>{

        let { id } = req.params;
        let chat = await Chat.findById(id);

        res.render("delete.ejs" , {  chat })
    
   
    
})


// New Show Route

app.get("/chats/:id",async (req,res, next)=>{

    let { id }= req.params;
    let chat = await Chat.findById(id);

    if (!chat){
        next(new ExpressError(404,"Chat not found"))        
    } 

    res.render("edit.ejs", { chat });
})

app.delete("/chats/:id", async (req,res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


// Error Handling Middleware

app.use((err,req,res, next)=>{

    let { status =500 , message ="Some error Occured" } = err;
    res.status(status).send(message);
})

// --------------------------------------------------------------------------------------------

app.get("/",(req,res)=>{
    res.send("everthing fine")
})



// let ask = prompt("Are you sure you want to Delete?");
    
// if(ask==="yes"||ask==="Yes"){
//     
// }
// else if(ask==="no"||ask==="No"){
//     alert("You got saved");
    
// }

// else{
//     alert("Wrong Input");
    
// }