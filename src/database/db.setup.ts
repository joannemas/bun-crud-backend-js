const mongoose = require('mongoose');

// Connect to MongoDB
let mongoDBURI;

if (process.env.NODE_ENV === 'test') {
  mongoDBURI = process.env.TEST_MONGODB_URI ?? 'mongodb://localhost:27017';
} else {
  mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
  console.log('Connected to MongoDB');
}

mongoose.connect(mongoDBURI);
export default mongoose;
