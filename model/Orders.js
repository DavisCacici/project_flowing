const mongoose = require('mongoose');
const main = require('../lib/connect');
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    status: {
        type: String,
    },
    items: [{
        quantity: {
            type: Number,
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: "articles"
        }
        
    }]
});

const modelName = 'Orders';

let Orders = mongoose.models[modelName]
? model(modelName)
: model(modelName, OrderSchema);

module.exports = Orders;
