import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
import leaveRoutes from './routes/leave.routes.js';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
const app = express();

// Middlewares
app.use(cors())
app.use(express.json());
//morgan for better debugging and logging
// app.use(morgan('dev'));
app.use(morgan(':method :url :status :response-time ms'));


// Connect to MongoDB
connectDB();


// Routes
app.use('/users', userRoutes);
app.use('/leaves', leaveRoutes);
app.use('/auth', authRoutes)

// global error handler
app.use((err, req, res, next) =>{
    console.error('Global Error :', err.stack);
    res.status(500).json({error : 'Something went wrong'})
})

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


//   extra 

// Shutdown handling
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully.');
    process.exit(0);
  });
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
  });




// health check rotue This gives a quick check to see if your API is alive.

app.get('/', (req, res) => {
    res.send('API is running...');
  });
  