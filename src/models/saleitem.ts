import { DataTypes, Model, Sequelize } from 'sequelize';
import { db } from '../db/db';
import { IBasicModel, BasicModel } from './basicModel';
import { Product } from './product';

const sequelize: Sequelize = db;

export interface ISaleItems extends IBasicModel {
  Qti: number;
  ProductId: number;
  SaleId: number;
}

export class SaleItems extends BasicModel implements ISaleItems {
  public Qti!: number;
  public ProductId!: number;
  public SaleId!: number;
}

SaleItems.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Qti: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    ProductId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    SaleId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: 'SaleItems',
    sequelize,
  },
);

SaleItems.hasOne(Product, {
  sourceKey: 'ProductId',
  foreignKey: 'id',
});
