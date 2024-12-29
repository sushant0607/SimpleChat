const mongoose = require("mongoose");
const Chat = require("./models/chats.js")

main()
.then(() => {
console.log("connection hogaya bhai")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats = [
    {
        from: "sushant",
        to: "sakshi",
        msg: "mera paisa wapas karde behen",
        created_at: new Date()
    },
    {
        from: "sushant",
        to: "kaushal",
        msg: "mera paisa wapas karde yaar",
        created_at: new Date()
    }, 
    {
        from: "kaushal",
        to: "kia",
        msg: "bhow",
        created_at: new Date()
    }
    
];



Chat.insertMany(allChats);