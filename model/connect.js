const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}  

module.exports = main;

// mongoose.connect('mongodb+srv://admin:4KVHxwxs@cluster0.7p48tlk.mongodb.net/ProjectFlowing', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
// }, () => { 
//     console.log('connected to database myDb ;)') 
// });