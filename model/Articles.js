const mongoose = require('mongoose');
const main = require('../lib/connect');
const { Schema, model } = mongoose;

const ArticleSchema = new Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    description: {
        type: String,
        require: true,
        min: 5,
    },
    price: {
        type: Number,
        require: true,
    },
});

// const Articles = model('Articles', ArticleSchema);
const modelName = 'Articles';

let Articles = mongoose.models[modelName]
? model(modelName)
: model(modelName, ArticleSchema);

module.exports = Articles;

