const jwt = require("jsonwebtoken");
const user = require("../models/usermodel");
const APIError = require("../utils/errors");

const createToken = async (user, res) => {
    console.log("Giriş yapıldı : " + user.nick + "/" + user.email);
    const payload = {
        sub: user._id,
        name: user.nick
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return res.status(201).json({
        success: true,
        token,
        message: "Giriş başarılı"
    });
};

const tokenCheck = async (req, res, next) => {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
    if (!headerToken) {
        return next(new APIError('Geçersiz Oturum Lütfen Oturum Açın', 401));
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userInfo = await user.findById(decoded.sub).select('_id name email');

        if (!userInfo) {
            throw new APIError('Geçersiz Token', 401);
        }

        req.user = userInfo;
        next();
    } catch (error) {
        next(new APIError('Geçersiz Token', 401));
    }
};
module.exports = {
    createToken,
    tokenCheck
};
