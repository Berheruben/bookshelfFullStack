import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './db/db'; 
import Book from './models/bookModel'; // Assuming you have properly exported the models
import User from './models/userModel';

import bookRouter from './routers/bookRouters';
import userRouter from './routers/userRouters';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Import routers and use them with proper prefixes

app.use('/book', bookRouter);
app.use('/user', userRouter);


const PORT = process.env.PORT || 3001;

// Connect to the database and create tables
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Define associations between models (assuming you have defined the associations in the models)

    // Un utente può avere molti libri associati (uno a molti)
    User.hasMany(Book, { foreignKey: 'userId' });
    Book.belongsTo(User, { foreignKey: 'userId' });
    
   
   
    await sequelize.sync(); // Synchronize models with the database

    // Start the server after the database connection is established and tables are created
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to connect to the database and start the server
connectToDatabase();

export default app;
