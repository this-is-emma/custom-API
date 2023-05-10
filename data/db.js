require('dotenv').config;

// TODO: Set up your Mongoose connection here.
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true ,useNewUrlParser: true  })
}

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Hooray! connected to database...'))
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled