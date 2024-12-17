const captainModel = require('../models/captainModel')
const captainService =  require('../services/captainService')
const {validationResult}  = require('express-validator')
const balckListToken =  require('../models/blackListToken')


module.exports.registerCaptain = async (req, res , next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    const {fullname , email , password , vehicle } =  req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email})
    if(isCaptainAlreadyExist) 
        return res.status(400).json({errors:[{msg: 'Captain already exist'}]})


    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptaine({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      email,
      password: hashedPassword,
      color:vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    })
    const  token = captain.generateAuthToken()
    res.cookie('token' ,token)
    res.status(201).json({
      message: 'Captaine registered successfully',
      captain,
      token,
    })

}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select('+password');
  if (!captain) {
    return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
  }
  const isMatch = await captain.comparePassword(password)
  if (!isMatch){
    return res.status(401).json({error: 'Invalid email or password'})
  }
  const token = captain.generateAuthToken();
  res.cookie('token' ,token)
  res.json({
    message: 'Logged in successfully',
    captain,
    token,
  });
}

module.exports.getCaptainProfile =  async (req , res , next) =>{
  res.status(200).json({captain: req.captain})
}

module.exports.logoutCaptaine =  async (req, res , next) =>{
  res.clearCookie('token')
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await balckListToken.create({token});
  res.json({message: 'User logged out successfully'})
}