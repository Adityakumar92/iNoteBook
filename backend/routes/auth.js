const express = require('express');
const router = express. Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'AdityaSecurity'

// ROUTE 1 : Create a user using : Post "/api/auth/createuser". no login required
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter min 5 letters').isLength({min: 5})
], async (req, res)=>{
    const errors = validationResult(req);
    let sucess=false;
    if(!errors.isEmpty()){
        return res.status(400).json({sucess, errors: errors.array()});
    }

    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({sucess, error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // res.json(user);
        
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        sucess=true;
        res.json({sucess, authtoken});

    }catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


// ROUTE 2 : Authenticate a user using: Post "/api/auth/login", no login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Cannt be blank').exists()
], async (req, res)=>{
    const errors = validationResult(req);
    let sucess=false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({sucess, error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compareSync(password, user.password);
        if(!passwordCompare){
            return RTCRtpSender.status(400).json({sucess, error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        sucess=true;
        res.json({sucess, authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3 : Get loggin User Details using: Post "/api/auth/getuser", login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;