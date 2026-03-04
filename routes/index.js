import express from 'express';
import passport from 'passport';
const router = express.Router();

import UserController from '../controllers/userController.js';
import ProductController from '../controllers/controller.js';
import { authentication, authorization } from '../middlewares/auth.js';

// 1. Rute Publik (Bisa diakses tanpa login)
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback endpoint that Google will redirect to after user approves
// make sure this path matches the value registered in the Google Cloud console
// and the GOOGLE_CALLBACK_URL environment variable
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/google/failure',
  }),
  UserController.googleAuthCallback
);

// simple failure route that can help debugging unauthorized responses
router.get('/auth/google/failure', (req, res) => {
  res.status(401).json({ error: 'Google OAuth failed' });
});

// 2. Pasang Shield (Mulai dari sini ke bawah harus login)
router.use(passport.authenticate('jwt', { session: false }));

// 3. Rute Terproteksi (Hanya untuk yang sudah login)
router.get('/', ProductController.find);
router.get('/:id', ProductController.findById);

// 4. Rute Admin/Owner (Butuh login + authorization)
router.post('/', ProductController.create);
router.put('/:id', authorization, ProductController.update);
router.delete('/:id', authorization, ProductController.delete);

export default router;