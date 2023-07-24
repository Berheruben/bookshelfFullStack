// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import bookRouter from './routers/bookRouters';
import userRouter from './routers/userRouters';
import loanRouter from './routers/loanRouters';
import cors from 'cors';
import sequelize from './db/db'; 
import Book from './models/bookModel'; 
import User from './models/userModel'; 
import Loan from './models/loanModel';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', loanRouter);
const PORT = 3001;

// Effettua la connessione al database e crea le tabelle

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Un utente può avere molti libri associati (uno a molti)
    User.hasMany(Book, { foreignKey: 'userId' });
    // Un libro appartiene a un singolo utente (molti a uno)
    Book.belongsTo(User, { foreignKey: 'userId' });

    Loan.belongsTo(Book, { foreignKey: 'bookId' });
    Loan.belongsTo(User, { foreignKey: 'userId' });
    Book.belongsToMany(User, {
      through: Loan,
      foreignKey: 'bookId',
    });
    User.belongsToMany(Book, {
      through: Loan,
      foreignKey: 'userId',
    });
    // Sincronizza i modelli (crea le tabelle)
    return sequelize.sync();
  })
  .then(() => {
    // Avvia il server solo dopo aver stabilito la connessione al database e creato le tabelle
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
