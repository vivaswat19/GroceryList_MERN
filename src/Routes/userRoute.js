const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
router.use(express.json());
const User = require("../Models/userModel");


router.get("/", async (req, res) => {
    const users = await User.find();
    if(users) {
        res.status(200).json(users);
    }
    else {
        res.status(400).json({err: "No User Data Found!"});
    }
})

router.get("/:id", async (req,res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.status(200).json(user);
    }
    else {
        res.status(400).json({err: "User Not Found!"});
    }
})

router.post("/:id/edit", async (req, res) => {
    res.status(405).send("Not Available");
})

router.post("/new", async (req, res) => {
    const users = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    }).then(
        console.log("User Created Successfully")
    ).catch(
        console.log("error while creating user")
    )
    await users.save();
    res.status(201).send("Successfully created user");
})

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}, async (err, user) => {
        if(err) throw error;

        if(user) {
            user.comparePassword(password, function(err, match) {
                if(err) throw err;
                
                if(match) {
                    res.status(200).send("Login Successful");
                }
                else {
                    res.status(400).send("Incorrect Password");
                }
            })
        }
        else {
            res.status(400).send("User Not Found!");
        }
    })
})


module.exports = router;