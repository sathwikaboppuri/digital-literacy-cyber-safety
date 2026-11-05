const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;

// Path for fallback JSON data persistence if MongoDB is not running locally
const dataDir = path.join(__dirname, '..', 'data');
const dataFilePath = path.join(dataDir, 'local_db.json');

const getLocalDb = () => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify({
        users: [],
        surveys: [],
        contacts: [],
        articles: []
      }, null, 2));
    }
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local file db:', err);
    return { users: [], surveys: [], contacts: [], articles: [] };
  }
};

const saveLocalDb = (data) => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving to local file db:', err);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/digital_literacy_db';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1000, // Fast timeout to fallback if server not running
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to MongoDB server (${error.message}).`);
    console.log(`[Auto-Fallback] Active: Utilizing persistent local JSON database in 'server/data/local_db.json'.`);
    console.log(`[Tip] To use live MongoDB, start your local mongod or provide MONGODB_URI in server/.env.`);
  }
};

const getMongoStatus = () => isConnected;

module.exports = {
  connectDB,
  getMongoStatus,
  getLocalDb,
  saveLocalDb
};
