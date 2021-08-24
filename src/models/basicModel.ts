import { Model } from 'sequelize';

export enum Action {
  none = 'none',
  insert = 'insert',
  update = 'update',
  delete = 'delete',
}

export interface IBasicModel {
  action: Action;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BasicModel extends Model implements IBasicModel {
  public action: Action = Action.none;
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
