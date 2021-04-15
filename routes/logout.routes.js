const app = require('express').Router();


app.get('/logOut',(req, res) => {

    req.session.destroy(()=>{

        res.redirect('/login')
    })

});

module.exports = app;