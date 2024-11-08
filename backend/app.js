import express from 'express';
import connectDB from './config.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js'


dotenv.config();  // Initialize environment variables

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth/login',authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
