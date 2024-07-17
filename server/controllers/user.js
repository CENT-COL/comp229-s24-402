const otplib = require('otplib');
const qrcode = require('qrcode');

const User = require('../models/user');
const generateToken = require('../utils/jwt');

// Register a User
exports.register = async(req, res) => {

    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ message: 'User created successfully', token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// Login a User
exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user) 
            return res.status(400).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ message: 'User logged in successfully', token, username: user.username });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.setup2FA = async (req, res) => {
    const { email } = req.body;

    //Generate a unique secret for this user
    const secret = otplib.authenticator.generateSecret();

    //Creaet an otpAuth URL for the QRCode
    const otpauth = otplib.authenticator.keyuri(email, 'Comp229 - Sec402 - OTP', secret);

    //Generate the QR code
    qrcode.toDataURL(otpauth, async (err, imageUrl) => {
        if(err){
            return res.status(500).json({ message: 'Error generating QR code', err });
        }

        try {
            //Store the secret in the user's profile
            const user = await User.findOneAndUpdate({email}, {otpSecret: secret});
            
            if(!user){
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'QR code generated', imageUrl });

        } catch (error) {
            res.status(500).json({ message: 'Error storing the secret', error });     
        }
    });
}

// Endpoint to verify the OTP during 2FA setup
exports.verify2FASetup = async (req, res) => {
    const {email, token} = req.body;

    //Fetch user's secret from the database
    const user = await User.findOne({email});
    if(!user){
        return rest.status(404).json({ message: 'User not found' });
    }

    const secret = user.otpSecret;  
    if(!secret){
        return res.status(400).json({ message: '2FA is not setup for this user' });
    }

    const isValid = otplib.authenticator.check(token, secrest);

    if(isValid){
        // Mark the user as having 2FA enabled
        user.is2FAEnabled = true;
        await user.save();
        res.status(200).json({ message: '2FA enabled successfully' });
    } else {
        res.status(400).json({ message: 'Invalid token' });
    }

};

// Endpoint to verify the OTP during login
exports.verifyOTP = async (req, res) => {
    const {email, token} = req.body;

     // Fetch user's secret from the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const secret = user.otpSecret;

    if (!secret) {
        return res.status(400).json({ message: '2FA is not setup for this user' });
    }

    const isValid = otplib.authenticator.check(token, secret);

    if (isValid) {
        // OTP is valid, proceed with authentication
        const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

        // return the JWT token
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: jwtToken
         });
    } else {
        res.status(400).json({ message: 'OTP is invalid.' });
    }


}