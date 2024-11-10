import express from 'express';
import connectDB from './config.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import userRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js'
import resourceRoutes from './routes/resource.route.js'


dotenv.config();  // Initialize environment variables

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/resources',resourceRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
