import { DataTypes, Sequelize, Model } from 'sequelize';
import { db } from '../db/db';
import { IBasicModel, BasicModel } from './basicModel';
import { SaleItem } from './saleitem';

export interface ISale extends IBasicModel {
  id: number;
  description: string;
  date: Date;
}

export class Sale extends BasicModel implements ISale {
  public id!: number;
  public description!: string;
  public date!: Date;
}

const sequelize: Sequelize = db;

Sale.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Sale',
  },
);

Sale.hasMany(SaleItem);
