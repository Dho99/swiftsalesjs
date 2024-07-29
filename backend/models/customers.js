const mongoose = require('mongoose');

const Customer = mongoose.model('customer', {
    customerId: {
        type: 'UUID',
        required: true,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
})

module.exports = Customer;