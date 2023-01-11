const mongoose = require('mongoose')


const RestApi = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        require: true

    },
    password:{
        type: String,
        require: true
    }

})
module.exports = mongoose.model("restApi", RestApi)