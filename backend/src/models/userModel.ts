import { Model, DataTypes } from 'sequelize';
import db from '../db/db';
import Book from './bookModel';
import Loan from './loanModel';
class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly books?: Book[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'Users',
    sequelize: db,
  }
);

export default User;
