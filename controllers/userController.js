import User from '../models/User.js'; 
import { hash, compare } from '../helpers/password.js';
import { generateToken } from '../helpers/token.js';

const UserController = {
    login: (req, res, next) => {
        const { email, password } = req.body;
        
        User.findOne({ email })
            .then(user => {
                if (user) {
                    
                    const isMatch = compare(password, user.password);
                    if (isMatch) {
                        const token = generateToken({ id: user._id, email: user.email });
                        res.json({
                            id: user._id,
                            email: user.email,
                            token
                        });
                    } else {
                        res.status(401).json({ error: 'Invalid email or password' });
                    }
                } else {
                    res.status(401).json({ error: 'User not found' });
                }
            })
            .catch(err => {
                next(err);
            });
    },

    register: (req, res, next) => {
        const { email, password } = req.body || {};

        User.create({ email, password })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    },
    // Menangani callback sukses dari Google OAuth
    googleAuthCallback: (req, res) => {
      // req.user otomatis diisi oleh Passport berdasarkan return dari GoogleStrategy
      if (!req.user) {
        console.error('googleAuthCallback: no req.user');
        return res.status(401).json({ error: 'Authentication failed' });
      }

      console.log('googleAuthCallback: req.user:', req.user);
      const token = generateToken({ id: req.userId, email: req.user.email });
      console.log('Google Auth Callback berhasil, token dibuat:', token);
      res.json({ token });
    }
};

export default UserController;