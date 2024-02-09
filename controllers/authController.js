const Userschema = require('../models/User')

//handleerror
const handleError = (err) => {
    console.log(err.message, err.code);
    const errors = {email: '', password: ''}
    return errors

    if (err.code === 11000) {
        errors.email = 'Email.is already in use'
    }
    if (err.message.includes("UserSchema validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            {
                errors[properties.path] = properties.message
            }
        })
    }
    return errors;
}
module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await Userschema.create({email, password});
        res.status(201).json(user);
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({errors})

    }
}
module.exports.login_post = (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    res.send(" user login")
}