import { DataTypes, Sequelize, Model } from 'sequelize';
import { db } from '../db/db';
import { IBasicModel, BasicModel } from './basicModel';

export interface IProduct extends IBasicModel {
  id: number;
  description: string;
  qty: number;
}

export class Product extends BasicModel implements IProduct {
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
