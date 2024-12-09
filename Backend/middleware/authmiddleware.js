const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not found, Unauthorized' });
    }
    const isBlackListed =  await userModel.findOne({token : token})
    if (isBlackListed) {
        return res.status(401).json({ message: 'Token has been blacklisted, Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        req.user = user;

        return  next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message })
    }
};
