import mongoose from 'mongoose';

const googleUserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
});

export default mongoose.models.GoogleUser || mongoose.model('GoogleUser', googleUserSchema);
