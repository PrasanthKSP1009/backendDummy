var express = require("express");
var app = express();
var cors = require("cors");
var mdb = require("mongoose");
var bodyparser = require("body-parser");
app.use(bodyparser.json());
var User = require("./models/user");
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  })
);

mdb.connect(
  "mongodb+srv://prasanth:Ksp%401009@mern.fyk0iap.mongodb.net/mernDb",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mdb.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Backend Started");
});
app.get("/user", (req, res) => {
  res.json({
    user_name: "Learning",
  });
});
app.post("/signup", (req, res) => {
  try {
    var { user_name, user_email, user_password } = req.body;
    const newUser = new User({
      user_name: user_name,
      user_email: user_email,
      user_password: user_password,
    });
    newUser.save().then(() => {
      console.log("User Added");
    });
    res.json({ message: "User Added" });
  } catch (error) {
    console.log(error);
    res.json({ error: "User unable to add" });
  }
});
app.post("/login", async (req, res) => {
  
  try {
    var { user_email, user_password } = req.body;
  var existingUser = await User.findOne({user_email:user_email})
  if (existingUser){
    if (user_password === existingUser.user_password){
        return res.json({loggedIn:true,message:"Login Successful"})
    }
    else {
        return res.json({loggedIn:false,message:"Invalid Cred"})
    }
  }
  else{
    return res.json({loggedIn:false,message:"User Does not exists"})
  }
  } catch (error) {
    console.log(error);
    return res.json({loggedIn:false,message:"Internal Server Error"})
  }
});

app.listen(8000, () => {
  console.log("Backend Started");
});
