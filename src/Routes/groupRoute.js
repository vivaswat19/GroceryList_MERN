const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
router.use(express.json());
const Group = require("../Models/groupModel");
const User = require("../Models/userModel");
const List = require("../Models/listModel");
const Item = require("../Models/itemModel");

router.get("/", async (req, res) => {
    const groups = await Group.find({});
    res.status(200).send(groups);
});

router.get("/get", async (req, res) => {
    try {
        User.find({username : req.query.username}, (err, user) => {
            res.status(200).json(user);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.post("/new", async (req, res) => {
    try {
        const group = await Group.create({
            name: req.body.name,
            members: req.body.members
        }); 
        await group.save();
        
        const groupId = group.id;
        
        const members = User.find({ '_id' : { $in : req.body.members}}, (err, val) => {
            val.forEach( user => {
                user.groups.push(groupId);
                user.save();
            })
         });

        res.status(201).json("successful");
    }
    catch (e) {
        res.status(400).json({error: e});
    }
});

router.post("/update", async (req, res) => {
    const group = await Group.findById(req.query.id);
    group.name = req.body.name;
    group.members = req.body.members;
    await group.save();

    const groupId = group.id;
    const users = await User.find({'_id' : { $in : req.body.deleted_members}});

    users.forEach((user) => {
        user.groups = user.groups.filter((elem) => elem != groupId);
        user.save();
    })

    res.status(200).json(group);
})

module.exports = router;