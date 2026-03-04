import Product from '../models/model.js';

const ProductController = {
    // GET ALL
    find: (req, res) => {
        Product.find()
            .then(products => res.json(products))
            .catch(err => res.status(500).json({ error: err.message }));
    },

    // GET BY ID
    findById: (req, res) => {
        Product.findById(req.params.id)
            .then(product => {
                if (!product) return res.status(404).json({ error: 'Product not found' });
                res.json(product);
            })
            .catch(err => res.status(500).json({ error: err.message }));
    },

    // POST
create: (req, res) => {
    // Ambil data dari body + ambil userId dari token (hasil authentication)
    const productData = { 
        ...req.body, 
        userId: req.userId // Ini kunci buat authorization nanti
    };

    Product.create(productData)
        .then(product => res.status(201).json(product))
        .catch(err => res.status(400).json({ error: err.message }));
},

    // PUT
    update: (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(product => res.json(product))
            .catch(err => res.status(400).json({ error: err.message }));
    },

    // DELETE
    delete: (req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: 'Product deleted successfully' }))
            .catch(err => res.status(500).json({ error: err.message }));
    }
};

export default ProductController;