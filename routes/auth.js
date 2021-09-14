const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('../validations');



router.post('/register', async(req, res) => {

    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const nameExist = await User.findOne({name: req.body.name})
    const emailExist = await User.findOne({email: req.body.email})

    if(nameExist) return res.status(400).send("name already exists")
    if(emailExist) return res.status(400).send("email already exists")

    const { name, email, password } = req.body
    const user = new User({name, email, password})

    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(err){
        res.status(400).send(err)
    }
})

module.exports = router;