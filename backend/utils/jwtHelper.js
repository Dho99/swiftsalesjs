const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const Session = require('../models/session');


const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
};
const verifyToken = (token, cbk) => {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            cbk({
                success: false,
                message: err.message
            })
        }else{
            cbk({
                success: true,
                message: 'Token Verified Successfully'
            })
        }
    });
};

const storeTokenToDB = async(args, cb) => {
    const storeSession = new Session({
        userEmail: args.email,
        token: args.token
    });
    try{
        await storeSession.save();
        cb({
            success: true,
            message: 'Token stored'
        });
    }catch(err){
        cb({
            success: false,
            message: 'Token Store Failed, reason : '+err.message
        });
    }
}
module.exports = { generateToken, verifyToken, storeTokenToDB };