const mongoose = require('mongoose');
const {MONGO_PASS, MONGO_USER, DB_NAME} = process.env;



const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.6oao1qi.mongodb.net/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DataBase Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
