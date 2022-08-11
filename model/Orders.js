const mongoose = require('mongoose');
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
            ref: "Articles"
        }
        
    }]
});

const modelName = 'Orders';

let Orders = mongoose.models[modelName]
? model(modelName)
: model(modelName, OrderSchema);

module.exports = Orders;
