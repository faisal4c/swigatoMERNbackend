const express = require('express')
const userRouter = express.Router();
const Users = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()


//to verify the req.body we will use npm express-validator
const { body, validationResult } = require('express-validator')



userRouter.post('/api/signup', body('email', 'Incorrect Email').isEmail(), body('password').isLength({ min: 5 }),async (req, res) => {
    try {
        if (validationResult(req).isEmpty()) {//checking and validating using express-validator
            //converting the password to hash using bcrypt js
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //creating the mongodb document for user
            const createdUser = await new Users({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                date: req.body.date,
                tokens: [],
            })

            //before saving the document we are generating a jwt token for user and sending it back to the client
            const jwtToken = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
            createdUser.tokens = createdUser.tokens.concat({ token: jwtToken });

            //saving the document
            await createdUser.save();
            res.status(201).send({ status: 'success', authToken: jwtToken });
        }
        else {
            //here it means that there is error in validation of express-validator
            res.status(400).send({ status: 'failure', error: "Please Enter Password of at least 6 characters" });
        }
    }
    catch (e) {
        if (e.code === 11000) {//error if duplicate email
            res.status(501).send({ status: 'failure', error: "Email already Present" });
        }
        else {
            res.status(501).send({ status: 'failure', error: e });
        }
    }
})

//handling route for logging in of user
userRouter.post('/api/login', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {

        if (validationResult(req).isEmpty()) {
            const dbres = await Users.findOne({ email: req.body.email });

            if (!dbres) {//if no document matches the email
                res.status(400).send({ status: 'failure', error: "Invalid Credentials" });
            }
            else {
                //password is stored as hash hence we cant compare directly we need to compare using brcrypt.compare()
                const compPassword = await bcrypt.compare(req.body.password, dbres.password);
                if (compPassword == true) {//if password matches

                    const jwtToken = await jwt.sign({ _id: dbres._id.toString() }, process.env.JWT_SECRET);
        
                    res.status(200).send({ status: 'success' ,authToken:jwtToken});
                }
                else {//if password doesnt matches
                    res.status(400).send({ status: 'failure', error: "Invalid Credentials" })
                }
            }
        }
        else {
            res.status(400).send({ status: 'failure', error: "Please Enter Password of at least 6 characters" });
        }

    }
    catch (err) {
        res.status(400).send({ status: 'failure', error: err })
    }
})

module.exports = userRouter;