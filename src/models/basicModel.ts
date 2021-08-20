import { Model } from 'sequelize';

export enum Action {
  none = 'none',
  insert = 'insert',
  update = 'update',
  delete = 'delete',
}

export interface IBasicModel {
  action: Action;
}

export class BasicModel extends Model implements IBasicModel {
  public action: Action = Action.none;
}
