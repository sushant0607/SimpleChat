const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override"); //to use put and patch requests

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //public folder use karne ke liye
app.use(express.urlencoded({extended: true})); //url se directly data lene ke liye
app.use(methodOverride("_method"));

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

//create route
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: message,
    created_at: new Date()
  });
  newChat
  .save()
  .then(res => {  //jaha par then use hota hai waha await use karne ki jarurat nahi hoti
    console.log("save hogaya bhai");
  })
  .catch((err) => {
    console.log(err);
  });
  res.redirect("/chats");
});


//edit route
app.get("/chats/:id/edit",async (req,res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id); //database se kuch bhi chedkaani karni ho toh async await use karna hota hai
  res.render("edit.ejs", { chat });
});


//Update route
app.put("/chats/:id", async (req,res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body; // to rename the content of message as newMsg
  let updatedChat = await Chat.findByIdAndUpdate( 
    id,
    {msg: newMsg}, 
    {runValidators: true, new: true}
  );

  console.log(updatedChat);
  res.redirect("/chats");
});



app.get("/", (req, res)=>{
    res.send("root chal raha hai bhai");
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});