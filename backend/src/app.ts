import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './db/db';
import Book from './models/bookModel';
import User from './models/userModel';

import bookRouter from './routers/bookRouters';
import userRouter from './routers/userRouters';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5174',
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Import routers and use them with proper prefixes
app.use('/book', bookRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;

// Connect to the database and create tables
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // An user can have many associated books (one-to-many)
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
