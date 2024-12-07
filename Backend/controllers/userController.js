const userModel =  require('../models/userModel')
const useService =  require('../services/userservice')
const {validationResult} =  require('express-validator')

module.exports.registerUser =  async (req , res, next) =>{
  const errors =  validationResult(req) 
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  console.log(req.body)
  const  {fullname , lastname , email , password} = req.body 
  const hashedPassword = await userModel.hashPassword(password)
  const user = await useService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword,
  })
  const  token = user.generateAuthToken()
  res.status(201).json({
    message: 'User registered successfully',
    user,
    token,
  })    
}