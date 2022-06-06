const mongoose = require("mongoose")


const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    }],
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})



module.exports = mongoose.model("Lists", ListSchema);