const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h'
    });
};
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(token){
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err){
                res.status(500).json({
                    success: false,
                    type: err.name,
                    message: 'Token verify error, reason: '+err.message
                })
            }else{
                next();
            }
        });
    }
};

const refreshToken = (oldToken, newToken, error) => {
    if(oldToken){
        jwt.verify(oldToken, SECRET_KEY, (err, decoded) => {
            if(err){
                error({
                    success: false,
                    message: 'An error occured, Reason : '+err.message
                });
            }else{
                const userNewToken = {
                    _id: decoded.id,
                    email: decoded.email
                }
                newToken(generateToken(userNewToken));
            }
        })
    }else{
        err({
            success: false,
            message: 'Must provide Token'
        })
    }
}

module.exports = { generateToken, verifyToken, refreshToken };