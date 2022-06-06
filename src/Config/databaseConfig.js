const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        console.log("Database Connection Successful")
    )
    .catch((err) => {
        console.log(err);
    })