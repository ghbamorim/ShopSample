import { db } from '../db/db';
import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

const sequelize: Sequelize = db;

export interface ISaleItems {
  id: number;
  Qti: number;
  ProductId: number;
  SaleId: number;
}

interface ISaleItemsCreationAttr extends Optional<ISaleItems, 'id'> {}

export class SaleItems
  extends Model<ISaleItems, ISaleItemsCreationAttr>
  implements ISaleItems
{
  public id!: number;
  public Qti!: number;
  public ProductId!: number;
  public SaleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
