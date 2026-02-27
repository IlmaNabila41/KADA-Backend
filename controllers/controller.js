import express from 'express';
import Product from '../models/model.js';  

const router = express.Router()

// GET ALL 
router.get('/', (req, res) => {
    Product.find()
        .then(products => { 
            res.json(products); 
        })
        .catch(err => {
            res.json({ error: err.message })
        })   
})

// GET BY ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// POST
router.post('/', (req, res) => {
    let { title, type, genre, author, year, rating, isFavorite } = req.body;

    year = Number(year)
    rating = Number(rating)

    if (!title || !type || !genre || !author || !year || !rating) {
        new Error('All fields are required');
    }

    Product.create({ title, type, genre, author, year, rating, isFavorite })
        .then(product => {
            res.json(product);
        })
        .catch(err => {
            res.json({ error: err.message })
        })  

})

// PUT
router.put('/:id', (req, res) => {
    let { title, type, genre, author, year, rating, isFavorite } = req.body;

    year = Number(year)
    rating = Number(rating) 

    if (!title || !type || !genre || !author || !year || !rating) {
        new Error('All fields are required');
    }   

    Product.findByIdAndUpdate(req.params.id, { title, type, genre, author, year, rating, isFavorite }, { new: true })
        .then(product => {
            res.json(product);
        })
        .catch(err => {
            res.json({ error: err.message })
        })
})

// DELETE
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Product deleted successfully' });
        })
        .catch(err => {
            res.json({ error: err.message })
        })
})

export default router;