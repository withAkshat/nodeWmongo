const mongoose = require('mongoose');

async function main() {
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



allChat = [{
    from: "roshan",
    to: "roshan",
    msg: "I want Lassi",
    created_to: new Date(),
},
{
    from: "Xavier",
    to: "Nick",
    msg: "Dont do it I said dont",
    created_to: new Date(),
},
{
    from: "Martin",
    to: "Lakshman",
    msg: "Bro that Dawl and rowti was fabulous",
    created_to: new Date(),
},
{
    from: "Anupam",
    to: "My Expertise",
    msg: "Leave SharkTank..",
    created_to: new Date(),
},

]


Chat.insertMany(allChat)

// Chat.Save()