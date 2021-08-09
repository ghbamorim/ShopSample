import {DataTypes, Sequelize, Model} from 'sequelize';
import {db} from "../db/db";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string | null;
}

const sequelize : Sequelize = db

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'User',
});


/*(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();*/