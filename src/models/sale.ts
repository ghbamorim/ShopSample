import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { db } from '../db/db';
import { IBasicModel, BasicModel } from './basicModel';
import { SaleItems } from './saleitem';

const sequelize: Sequelize = db;

export interface ISale extends IBasicModel {
  description: string;
  date: Date;
}

export class Sale extends BasicModel implements ISale {
  public description: string = '';
  public date!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'Sale',
    sequelize,
  },
);

Sale.hasMany(SaleItems, {
  sourceKey: 'id',
  foreignKey: 'SaleId',
});
