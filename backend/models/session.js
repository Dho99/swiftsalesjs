const mongoose = require('mongoose');

const Session = mongoose.model('session', {
    userEmail: {
        type: String, 
        required: true
    },
    token: {
        type: String,
        required:true
    }
});

module.exports = Session;