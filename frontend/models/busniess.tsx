import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.auth || mongoose.model('business', BusinessSchema);