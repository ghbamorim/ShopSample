import { db } from '../db/db';
import { SaleItems } from './saleitem';
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';

const sequelize: Sequelize = db;

export interface ISale {
  id: number;
  description: string;
  date: Date;
}

interface ISaleCreationAttr extends Optional<ISale, 'id'> {}

export class Sale
  extends Model<ISale, ISaleCreationAttr>
  implements ISale
{
  public id!: number;
  public description: string = '';
  public date!: Date;
  //public SaleItems!: SaleItems[];

  public getSaleItems!: HasManyGetAssociationsMixin<SaleItems>; // Note the null assertions!
  public addSaleItems!: HasManyAddAssociationMixin<SaleItems, number>;
  public hasSaleItems!: HasManyHasAssociationMixin<SaleItems, number>;
  public countSaleItems!: HasManyCountAssociationsMixin;
  public createSaleItem!: HasManyCreateAssociationMixin<SaleItems>;

  public readonly SaleItems?: SaleItems[];

  public static associations: {
    projects: Association<Sale, SaleItems>;
  };
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
  //as: 'Sales', // this determines the name in `associations`!
});
