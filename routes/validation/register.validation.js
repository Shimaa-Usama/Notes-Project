const { check } = require('express-validator')
module.exports = [check('name').contains('sh'),
                    check('email').isEmail(),
                    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
                    check('confirmPassword').custom((value, { req }) => {
                        if (value !== req.body.password) {
                            return false;

                        }
                    
                        return true;
                    })

]