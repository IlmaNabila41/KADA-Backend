import mongoose from "mongoose";

const errorHandler = (err, req, res, next) => {
    let message = 'Internal server error';
    let status = 500;

    if (err.code === 11000) {
        // duplicate key (e.g. unique email)
        message = 'Email already exists';
        status = 400;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const tempErrors = [];
        for (let key in err.errors) {
            tempErrors.push(err.errors[key].message);
        }
        message = tempErrors.join(', ');
        status = 400;
    }

    // if no status was set above, keep the default 500
    res.status(status).json({ error: message });
}

    export default errorHandler;