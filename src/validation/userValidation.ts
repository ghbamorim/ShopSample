import {User} from '../models/user'
import {ValidationError} from '../models/types'

export class UserValidations {
  static validateInsert = (user : User, errors : ValidationError[]) => {
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

  static validateUpdate = (user : User, errors : ValidationError[]) => {
    let valid : Boolean = true;

    if (!user.id) {
      errors.push(
        {field: "id",
        message: "Id cannot be null"
        }
      )
      valid = false;
    }
    if (user.firstName === '') {
      errors.push(
        {field: "firstName",
        message: "First Name cannot be null"
        }
      )
      valid = false;
    }
    return valid;
  }
}