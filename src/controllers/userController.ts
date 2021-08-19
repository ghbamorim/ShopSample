import { User, IUser } from '../models/user';
import { ValidationError } from '../models/types';
import { UserValidations } from '../validation/userValidation';

export class UserController {
  newUser = async (data: IUser, errors: ValidationError[]) => {
    const user = await User.build(data);
    if (UserValidations.validateInsert(user, errors)) {
      await user.save();
      return true;
    }
    return false;
  };

  updateUser = async (data: IUser, errors: ValidationError[]) => {
    if (UserValidations.validateUpdate(data as User, errors)) {
      await User.update(data, {
        where: {
          id: (data as User).id,
        },
      });
      return true;
    }
    return false;
  };

  deleteUser = async (data: IUser, errors: ValidationError[]) => {
    if (UserValidations.validateDelete(data as User, errors)) {
      await User.destroy({
        where: {
          id: (data as User).id,
        },
      });
      return true;
    }
    return false;
  };

  getUsers = async () => {
    return await User.findAll();
  };

  findUserForLogin = async (
    user: IUser,
    errors: ValidationError[],
  ) => {
    let foundUser = null;
    if (UserValidations.validateLogin(user, errors)) {
      foundUser = await User.findOne({
        where: { firstName: user.firstName, password: user.password },
      });
      if (!foundUser) {
        errors.push({
          field: 'none',
          message: 'User not found',
        });
      }
    }
    return foundUser;
  };
}
