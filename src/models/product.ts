import { DataTypes, Sequelize, Model } from 'sequelize';
import { db } from '../db/db';

export class Product extends Model {
  public id!: number;
  public description!: string;
  public qty!: number;
}

const sequelize: Sequelize = db;

Product.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  },
);
