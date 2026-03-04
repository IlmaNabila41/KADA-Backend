import mongoose from 'mongoose';
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      console.log('MongoDB connected');

      // clean up any duplicate emails and ensure the unique index exists
      try {
          const User = mongoose.model('users');
          // find emails with more than one document
          const duplicates = await User.aggregate([
              { $group: { _id: '$email', ids: { $push: '$_id' }, count: { $sum: 1 } } },
              { $match: { count: { $gt: 1 } } }
          ]);
          for (const d of duplicates) {
              // keep the first id, delete the rest
              const [, ...toRemove] = d.ids;
              await User.deleteMany({ _id: { $in: toRemove } });
          }

          await User.syncIndexes(); // will create the unique email index
      } catch (e) {
          console.error('index sync/cleanup error', e.message);
      }
  })
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;