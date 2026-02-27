import mongoose from 'mongoose';
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;