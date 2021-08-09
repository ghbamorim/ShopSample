import {User} from '../models/user'
import {UserValidations} from "../validation/userValidation";

export class UserController {
  newUser = async (data : Object, errors : any[]) => {
    const user = await User.build(data);
    if (UserValidations.validate(user, errors)) {
      await user.save()
      return true;
    }
    return false;
  }
}

