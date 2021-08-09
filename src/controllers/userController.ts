import {User} from '../models/user'
import {ValidationError} from '../models/types'
import {UserValidations} from "../validation/userValidation";

export class UserController {
  newUser = async (data : Object, errors : ValidationError[]) => {
    const user = await User.build(data);
    if (UserValidations.validate(user, errors)) {
      await user.save()
      return true;
    }
    return false;
  }
}

