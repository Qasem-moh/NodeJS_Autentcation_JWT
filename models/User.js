const mongoose = require('mongoose');
const {isEmail} = require("validator");
const bcrypt=require("bcryptjs");
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please enter a valid email address is required'],
        unique:[true, 'Please enter a valid email address, your email is already in use'],
        lowercase:true,
        validate:[isEmail, 'Please enter a valid email address']
    },password:{
        type:String,
        required:[true, 'Please enter a valid password'],
        minlength:[6, ' Please enter a valid password length is6 characters'],

    }
})
//fire a function after doc saved to db
UserSchema.post('save',function(doc,next){
    console.log('new user was created',doc)
    next()
})
//fire a function before doc saved to db
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    console.log("user about to be created", this)
    next();
})

module.exports = mongoose.model('UserSchema',UserSchema);