const app = require('express').Router();
const noteModel = require('../models/notes.model')

app.post('/delete', async(req, res) => {
    await noteModel.findByIdAndDelete( { _id:req.body.delete } )
    res.redirect('/home')
});

module.exports = app;