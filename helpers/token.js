import jwt from 'jsonwebtoken';

// generate a JWT for a payload and sign with secret from env
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.secret);
};

// verify/ decode a token, will throw if token is invalid or expired
export const decodeToken = (token) => {
    return jwt.verify(token, process.env.secret);
};

// default export preserved for backward compatibility
export default generateToken;