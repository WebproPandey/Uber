const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captainController');
const authMiddleware =  require('../middleware/authmiddleware');


router.post('/register', [
    body('fullname.firstname').isString().withMessage('Firstname must be a string').isLength({ min: 4 }).withMessage('Firstname must be at least 4 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be one of: red, blue, green, yellow'),
    body('vehicle.plate').isString().withMessage('Vehicle plate must be a string').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage('Vehicle type must be one of: motorcycle, car, auto3'),
], captainController.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
], captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptaine , captainController.getCaptainProfile);
router.get('/logout',authMiddleware.authCaptaine , captainController.logoutCaptaine);

module.exports = router;
