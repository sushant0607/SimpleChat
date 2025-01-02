const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //public folder use karne ke liye

main()
.then(() => {
console.log("connection hogaya bhai")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//index route
app.get("/chats", async (req, res) => {
   let chats = await Chat.find();
  //  console.log(chats);
   res.render("index.ejs", { chats });
});


//new route
app.get("/chats/new", (req,res) => {
  res.render("new.ejs");
})

app.get("/", (req, res)=>{
    res.send("root chal raha hai bhai");
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
});