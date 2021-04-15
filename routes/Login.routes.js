const app = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/users.model')


app.get('/login', (req, res) => {
    if(req.session.isloggedin){
        res.redirect('/home')
    }else{
        res.render('login',{ pass8lt: req.flash('8lt'), oldEmail: req.flash('oldEmail'), exists: req.flash('exists'), isloggedin:req.session.isloggedin})
    }
});

app.post('/handleSignin', async(req, res) => {
    const { email, password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            req.session.isloggedin = true;
            req.session.userID = user._id;

            res.redirect('/home')
        }else{
            req.flash('8lt', true)
            req.flash('oldEmail', email)

            res.redirect('/login')
        }
    }else{
        req.flash('exists', true)

        res.redirect('/login')

    }
    
});

module.exports = app;