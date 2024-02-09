const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv =require ('dotenv');
dotenv.config();
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
//middleware
app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs');

const dbURI =process.env.MONGO_URI
mongoose.connect(dbURI ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then((result)=>app.listen(5452,()=>console.log("connected")))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.get('/set_cookies',(req,res)=>{
    res.setHeader("set_cookies","New_User=true",)
    res.send("you got the cookies")
})
app.get('/read_cookies',(req,res)=>{})