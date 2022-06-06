const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lists: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Lists"
    }]
})


module.exports = mongoose.model("Groups", GroupSchema);