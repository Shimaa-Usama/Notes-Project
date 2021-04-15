const app = require('express').Router();
const auth = require('../middleware/auth')
const noteModel = require('../models/notes.model')

app.get('/home', auth, async(req, res) => {

    let notes = await noteModel.find( {  userID:req.session.userID } )
    res.render('home',{isloggedin:req.session.isloggedin, notes})

});

module.exports = app;