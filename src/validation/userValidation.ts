import { User, IUser } from '../models/user';
import { ValidationError } from '../models/types';

export class UserValidations {
  static validateLogin = (user: IUser, errors: ValidationError[]) => {
    let valid: boolean = true;
    if (user.firstName === '') {
      errors.push({
        field: 'firstName',
        message: 'First Name cannot be null',
      });
      valid = false;
    }

    if (user.password === '') {
      errors.push({
        field: 'password',
        message: 'Password cannot be null',
      });
      valid = false;
    }

    return valid;
  };
  static validateInsert = (
    user: IUser,
    errors: ValidationError[],
  ) => {
    if (user.firstName === '') {
      errors.push({
        field: 'firstName',
        message: 'First Name cannot be null',
      });
      return false;
    }
    return true;
  };

  static validateUpdate = (
    user: IUser,
    errors: ValidationError[],
  ) => {
    let valid: Boolean = true;

    if (!user.id) {
      errors.push({ field: 'id', message: 'Id cannot be null' });
      valid = false;
    }
    if (user.firstName === '') {
      errors.push({
        field: 'firstName',
        message: 'First Name cannot be null',
      });
      valid = false;
    }
    return valid;
  };

  static validateDelete = (
    user: IUser,
    errors: ValidationError[],
  ) => {
    let valid: Boolean = true;
    if (!user.id) {
      errors.push({ field: 'id', message: 'Id cannot be null' });
      valid = false;
    }
    return valid;
  };
}
