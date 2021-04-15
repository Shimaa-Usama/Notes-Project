const app = require('express').Router();
const noteModel = require('../models/notes.model')

app.post('/addNote', async(req, res) => {
    
    const { title, desc } = req.body;
    await noteModel.insertMany( { title, desc, userID:req.session.userID } )
    res.redirect('/home')
});

module.exports = app;