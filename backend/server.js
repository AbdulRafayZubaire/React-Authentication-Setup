import express from 'express';
import connectDB from './db.js'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
// exported from routes/index.js

import userRoute from './src/routes/userRoutes.js'
import passwordRoutes from './src/routes/passwordRoutes.js';
import googleOauthRoute from './src/routes/googleOauthRoutes.js'

app.use('/api/user', userRoute)
app.use('/api', passwordRoutes)
app.get('/auth/google/callback', (req,  res)=>{
    res.status(200).json("hello world")
});
app.use('/auth/google', googleOauthRoute);
// app.use(/)

// Middlewares
// app.use(notFound);
app.use(errorHandler);

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
// initializeDbConnection()
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    });