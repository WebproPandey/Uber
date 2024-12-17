const userModel =  require('../models/userModel')
const useService =  require('../services/userService')
const {validationResult} =  require('express-validator')
const balckListToken =  require('../models/blackListToken')

module.exports.registerUser =  async (req , res, next) =>{
  const errors =  validationResult(req) 
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const  {fullname , lastname , email , password} = req.body 
  const isUserAlready = await userModel.findOne({email})
  if (isUserAlready){
    return res.status(400).json({error: 'User already exists'})
  }

  const hashedPassword = await userModel.hashPassword(password)
  const user = await useService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword,
  })
  const  token = user.generateAuthToken()
  res.cookie('token' ,token)
  res.status(201).json({
    message: 'User registered successfully',
    user,
    token,
  })    
}

module.exports.loginUser =  async (req , res, next) => {
  const errors =  validationResult(req) 
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {email , password} = req.body
  const user = await userModel.findOne({email}).select('+password');
  if (!user){
    return res.status(401).json({error: 'Invalid email or password'})
  }
  const isMatch = await user.comparePassword(password)
  if (!isMatch){
    return res.status(401).json({error: 'Invalid email or password'})
  }
  const token = user.generateAuthToken()
  res.cookie('token' , token)
  console.log(token)
  res.json({message: 'User logged in successfully', token ,  user})
}

module.exports.getUserProfile =  async (req , res, next) => {
   res.status(200).json(req.user)  
}
module.exports.logoutUser =  async (req , res, next) => {
  res.clearCookie('token')
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await balckListToken.findOneAndUpdate({token}, {expiry: Date.now()});
  res.json({message: 'User logged out successfully'})
}