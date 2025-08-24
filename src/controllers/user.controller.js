import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../auth/auth.js'
import 'dotenv/config';




//Sign Up Controller Function
export const signUpUser = async (req, res) => {
    const { fullname, lastname, email, password, phoneNumber, role } = req.body;


    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
        return res.status(409).json({ message: `User already exists` });
    }

    // Hash the password before storing in the database (hash and salt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        fullname,
        lastname,
        email,
        password: hashedPassword,
        phoneNumber,
        role
    });

    // Save the user to the database
    await newUser.save();

    // Generate token using the imported function
    const accessToken = generateAccessToken(newUser);

    //Respond with success message
    res.status(200).json({ message: 'User registered successfully', token: accessToken, newUser });

}


//Sign In Controller Function
export const signInUser = async (req, res) => {

    const { email, password } = req.body;

    // Check if the user exists by their ue email
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        // Passwords match, generate JWT token
        const accessToken = generateAccessToken(user);

        return res.status(200).json({ message: 'Sign In successful', token: accessToken, user });
    } else {
        // Passwords don't match
        return res.status(400).json({ message: 'Invalid email or password', code: 'INVALID_EMAIL_OR_PASSWORD' });
    }
}


//Sign In Controller Function
export const signInAdmin = async (req, res) => {

    const { email, password } = req.body;

    // Check if the user exists by their ue email
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Admin not found' });

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        // Passwords match, generate JWT token
        const accessToken = generateAccessToken(user);

        return res.status(200).json({ message: 'Admin Sign In successful', token: accessToken, user });
    } else {
        // Passwords don't match
        return res.status(400).json({ message: 'Invalid email or password', code: 'INVALID_EMAIL_OR_PASSWORD' });
    }
}


