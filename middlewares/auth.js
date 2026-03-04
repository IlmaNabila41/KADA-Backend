import { decodeToken } from '../helpers/token.js';
import Product from '../models/model.js';

// helper to grab bearer token safely
function getBearerToken(header) {
    if (!header) return null;
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
}

const authentication = (req, res, next) => {
    // check if the request has authorization header, if not, return error
    try {
        const token = getBearerToken(req.headers.authorization);
        if (!token) throw new Error('missing token');
        const decoded = decodeToken(token); // decode the token, if invalid, it will throw an error

        req.userId = decoded.id; // set the userId to the request, so it can be used in the controller
        next(); // continue to the next middleware or controller
    } catch (err) {
        next({ message: 'You should log in first', status: 401 }); // if error, return error message and status code
    }
}
    
const authorization = (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => {
        if (!product) {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
        }
        
        // Debugging: Munculin di terminal biar kita tau isinya apa
        console.log('User ID dari Token:', req.userId);
        console.log('User ID di Produk:', product.userId);

        // Cek apakah userId di produk ada dan cocok dengan userId dari token
        if (product.userId && product.userId.toString() === req.userId) {
            return next();
        } else {
            return res.status(403).json({ error: 'Bukan punyamu, dilarang edit!' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Terjadi kesalahan pada server saat validasi' });
    })
}

export { authentication, authorization };