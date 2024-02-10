const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv =require ('dotenv');
dotenv.config();
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
const {requireAuth,checkUser} = require("./middleware/authMiddleware");
//middleware
app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs');
app.use(cookieParser())

const dbURI =process.env.MONGO_URI
mongoose.connect(dbURI ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then((result)=>app.listen(5452,()=>console.log("connected")))
.catch((err)=>console.log(err))

app.get('*',checkUser)
app.get('/',(req,res)=>res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)

