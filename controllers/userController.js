import User from '../models/User.js'; 
import { hash, compare } from '../helpers/password.js';
import { generateToken } from '../helpers/token.js';
import sendEmail from '../helpers/mailers.js';

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

    // 1. Simpan desain estetik tadi ke dalam variabel agar kode tidak berantakan
    const htmlTemplate = `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; background-color: #fdfbfb; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f1f1f1;">
        
        <div style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); padding: 50px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Nebulibrary</h1>
          <p style="color: white; opacity: 0.9; font-style: italic; margin-top: 10px;">Where every book is a star in your galaxy.</p>
        </div>

        <div style="padding: 40px; text-align: center; color: #4a4a4a;">
          <h2 style="color: #6b46c1; font-weight: 400;">Welcome to the Constellation! ✨</h2>
          
          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 25px;">
            Hello, <b>${email}</b>. <br><br>
            We are so happy to have you here. Your journey through the cosmic aisles of <b>Nebulibrary</b> has officially begun. Think of this as your safe space to explore, dream, and get lost among the pages of the universe.
          </p>

          <div style="background-color: #faf5ff; border-radius: 15px; padding: 20px; margin: 30px 0; border: 1px dashed #d6bcfa;">
            <p style="margin: 0; font-style: italic; color: #805ad5;">
              "The universe is made of stories, not of atoms."
            </p>
          </div>

          <div style="margin-top: 40px;">
            <a href="#" style="background-color: #9f7aea; color: white; padding: 15px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 15px rgba(159, 122, 234, 0.3);">Start Exploring</a>
          </div>
        </div>

        <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #edf2f7;">
          <p style="margin: 0; font-size: 10px; color: #a0aec0; letter-spacing: 1px;">
            SENT WITH STARDUST FROM NEBULIBRARY TEAM
          </p>
        </div>
      </div>
    `;

    User.create({ email, password })
        .then(user => {
            // 2. Jalankan fungsi kirim email setelah user berhasil dibuat
            sendEmail(email, 'Welcome to the Constellation! ✨', htmlTemplate);
            
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