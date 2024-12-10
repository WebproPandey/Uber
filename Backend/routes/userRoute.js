const express =  require('express')
const router = express()
const {body}  =  require('express-validator')
const userController  =  require('../controllers/userController');
const authMiddleware =  require('../middleware/authmiddleware');


router.post("/register",[
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],
 userController.registerUser
)
router.post("/login",[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],
userController.loginUser
)

router.get("/profile/", authMiddleware.authUser , userController.getUserProfile)
router.get('/logout' ,  authMiddleware.authUser, userController.logoutUser)


module.exports =  router