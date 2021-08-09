import {User} from '../models/user'
import {ValidationError} from '../models/types'
import {UserValidations} from "../validation/userValidation";

export class UserController {
  newUser = async (data : Object, errors : ValidationError[]) => {
    const user = await User.build(data);
    if (UserValidations.validateInsert(user, errors)) {
      await user.save()
      return true;
    }
    return false;
  }

  updateUser = async (data : Object, errors : ValidationError[]) => {
      if (UserValidations.validateUpdate((data as User), errors)) {
        await User.update(data, {
          where: {
            id: (data as User).id
          }
        });
        return true;
    }
    return false;
  }

  getUsers = async () => {
    return await User.findAll();
  }
}

