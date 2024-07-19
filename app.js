const express = require('express');
const { webport, mongourl } = require('./utlis/config.');
const mongoose = require('mongoose');
const { recipeRouter } = require('./routes/recipe.route');
const { userRouter } = require('./routes/user.route');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('./utlis/passport.config');
const cors = require('cors');
const port = webport;

const connectTodb=async()=>{
  try {
    await mongoose.connect(mongourl);
    console.log("connected to db");
  } catch (error) {
    throw(error)
  }
}

app.use(session({
  secret:'your_secret_key',
  resave:false,
  saveUninitialized:true
}))


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


// body parsing middleware
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('<center><h1>Welcome to Recipe generator app</h1></center>');
})

app.use('/api/recipes',recipeRouter);
app.use('/api/users',userRouter);

app.listen(port,()=>{
    connectTodb();
    console.log(`web server is running on  http://localhost:${port}`);
})
