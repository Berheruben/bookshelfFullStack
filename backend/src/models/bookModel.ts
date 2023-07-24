import { Model, DataTypes } from 'sequelize';
import db from '../db/db';
import User from './userModel';

class Book extends Model {
  declare id: number;
  public title!: string;
  public author!: string;
  public isbn!: string;
  public plot!: string;
  public numReads!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly users?: User[];
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    author: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    isbn: {
      type: new DataTypes.STRING(13),
      allowNull: false,
    },
    plot: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    numReads: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    tableName: 'Books',
    sequelize: db,
  }
);


export default Book;
