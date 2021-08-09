import {User} from '../models/user'

export class UserValidations {
  static validate = (user : User, errors : any[]) => {
    if (user.firstName === '') {
      errors.push(
        {field: "firstName",
        message: "First Name cannot be null"
        }
      )
      return false;
    }
    return true;
  }
}