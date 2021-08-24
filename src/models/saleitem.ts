import { DataTypes, Sequelize, Model } from 'sequelize';
import { db } from '../db/db';
import { IBasicModel, BasicModel } from './basicModel';

export interface ISaleItem extends IBasicModel {
  id: number;
  qti: number;
  productId: number;
}

export class SaleItem extends BasicModel implements ISaleItem {
  public id!: number;
  public qti!: number;
  public productId!: number;
}

const sequelize: Sequelize = db;

SaleItem.init(
  {
    qti: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.NUMBER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    saleId: {
      type: DataTypes.NUMBER,
      references: {
        model: 'sale',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'SaleItem',
  },
);
