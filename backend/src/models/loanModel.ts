import { Model, DataTypes } from 'sequelize';
import db from '../db/db';
import Book from './bookModel';
import User from './userModel';

class Loan extends Model {
  public id!: number;
  public bookId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'Loan',
    sequelize: db,
  }
);

export default Loan;
