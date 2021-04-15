const app = require('express').Router();
const { validationResult } = require('express-validator');
const validation = require('./validation/register.validation');
const bcrypt = require('bcrypt');
const userModel = require('../models/users.model')


app.get('/', (req, res) => {
    if(req.session.isloggedin){
        res.redirect('/home')
    }else{
        res.render('register', {errors: req.flash('errors'), exists:req.flash('exists'), oldInputs:req.flash('oldInputs'), isloggedin:req.session.isloggedin})
    }
});



app.post('/handleSignUp', validation , async(req, res) => {
    const {name, email, password} = req.body;
    let errors = validationResult(req);
    let user = await userModel.findOne({email});
    if(user){
        req.flash('exists', true)
        res.redirect('/')
    }
    else{
        if(errors.isEmpty()){

            bcrypt.hash(password, 7, async(err, hash)=> {
            await userModel.insertMany({ name, email, password:hash })

            res.redirect('/login')
            });
    
        }else{
            req.flash('errors', errors.array());
            req.flash('oldInputs', {name, email, password})

            res.redirect('/')
        }
    }

});

module.exports = app;