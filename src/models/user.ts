import { DataTypes, Sequelize, Model } from 'sequelize';
import { db } from '../db/db';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string | null;
  password: string;
}

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string | null;
  public password!: string;
}

const sequelize: Sequelize = db;

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);
