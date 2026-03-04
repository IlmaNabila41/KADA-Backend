import mongoose, { Schema} from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
    id: ObjectId,
    userId: { type: ObjectId, ref: 'User', required: true }, // owner of the product
    title: String,
    type: String,
    genre: String,
    author: String,
    year: Number,
    rating: Number,
    isFavorite: Boolean
}, { 
    timestamps: true 

});

const Product = mongoose.model('Product', ProductSchema);

export default Product;