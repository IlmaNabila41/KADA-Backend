import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.ObjectId;
import { hash } from "../helpers/password.js";

const usersSchema = new mongoose.Schema(
  {
    id: ObjectId,
    email: { type: String, required: true, unique: true },
    // password is optional because Google OAuth users will not supply one
    password: { type: String },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

// NOTE: `unique: true` on the field is enough to declare the index.
// Mongoose will create the index when the model is compiled and `syncIndexes`
// is called.  We removed the explicit `schema.index()` call to avoid the
// duplicate-index warning emitted earlier.

usersSchema.pre("save", async function () {
  //pre save hook: only hash when a password is present AND has been changed
  if (!this.isModified("password") || !this.password) return;
  this.password = await hash(this.password);
});

const users = mongoose.model("users", usersSchema); //create model users based on usersSchema, and collection name is 'users' in MongoDB

// attempt to sync indexes when the model is initialized. The connection may
// not yet be open, but Mongoose queues the request so it will run later.
users.syncIndexes().catch((err) => {
  console.error("Failed to sync user indexes:", err.message);
});

export default users; //export model users, so it can be used in other files.
