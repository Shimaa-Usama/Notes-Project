const app = require('express').Router();
const noteModel = require('../models/notes.model')

app.post('/update', async(req, res) => {
    const {id, title, desc} = req.body;
    console.log(req.body);
    await noteModel.findByIdAndUpdate( {_id :id }, { title, desc } )
    res.redirect('/home')
});

module.exports = app;