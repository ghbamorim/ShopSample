import {User} from '../models/user'
import {ValidationError} from '../models/types'

export class UserValidations {
  static validate = (user : User, errors : ValidationError[]) => {
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