const User = require('../models/users');
const generateToken = require('../utils/jwt');

// Register a new user
exports.registerUser = async(req, res) => {

    console.log("Body Received",req.body);

    try {
        const { username, email, password } = req.body;
        const user = new User({username, email, password});
        await user.save();

        const token = generateToken(user);

        res.status(201).json({message: 'User created successfully', token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user  = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await user.comparePassword(password);
        
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = generateToken(user);
        
        res.json({message: 'Login successful', token});

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}