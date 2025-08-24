import dotenv from 'dotenv';
import express from 'express';
import corsMiddleware from './middleware/cors.js';
import passport from 'passport';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import boookingRoutes from './routes/booking.routes.js';
import cookieParser from 'cookie-parser';
// import { apiLimiter } from './middleware/rateLimiter.js';
import throttle from './middleware/throttle.js';
import morgan from 'morgan';
import isLoggedin from './utils/isLoggedin.js';


// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Initialize Express application
const app = express();

// Enable 'trust proxy' to correctly use 'X-Forwarded-For' header
app.set('trust proxy', 'loopback'); // Trust only loopback addresses (127.0.0.1)


// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

// Use the CORS middleware
app.use(corsMiddleware);

app.options('*', corsMiddleware);

// Apply general rate limiter before any API processing
app.use(throttle);

// To parse form data in POST request body
app.use(express.urlencoded({ extended: true }));

// To parse incoming JSON in POST request body
app.use(express.json({ limit: '2mb' }));

// Use cookieParser middleware
app.use(cookieParser());

// Initialize Passport for authentication
app.use(passport.initialize());

// Apply specific rate limiter to API routes
// app.use('/api/', apiLimiter);

// Authentication-related routes
app.use('/api/auth', userRoutes);

app.use('/api/admin', adminRoutes);

//Authenticate Routes Below this middleware
app.use(isLoggedin);
app.use('/api/booking', boookingRoutes);



// Error handling middleware
app.use((err, res) => {
    // Extract status and message from the error object, defaulting to 500 and a generic message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    // Log the error details to the console for debugging
    console.error(err);

    // Send the error response to the client
    res.status(status).json({ message });
});


export default app;
