import mongoose from 'mongoose';

export async function connectMongoDB(providerType) {
  try {
    let dbURI;

    // Implementing switch statement here to determine the MongoDB URI
    switch (providerType) {
      case 'email':
        dbURI = process.env.MONGODB_URI;
        break;
      case 'google':
        dbURI = process.env.MONGODB_GOOGLE;
        break;
      default:
        // Provide a default URI or log an error message
        console.error('Invalid provider type. Using a default MongoDB URI.');
        dbURI = 'default-mongodb-uri';
    }

    // Check if the Mongoose connection is already open 
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB is already connected.');
      return;
    }

    // Connect to MongoDB using the determined dbURI
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log that the connection was successful
    console.log(`Connected to MongoDB using ${dbURI}`);
  } catch (error) {
    // Handle any errors that occur during the connection
    console.error('Error connecting to MongoDB:', error);
    throw error; 
  }
}