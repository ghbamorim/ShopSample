import {Product, IProduct} from '../models/product'
import {ValidationError} from '../models/types'

export class ProductValidations {
  static validateInsert = (prod : IProduct, errors : ValidationError[]) => {
    if (prod.description === '') {
      errors.push(
        {field: "description",
        message: "Description cannot be null"
        }
      )
      return false;
    }
    return true;
  }

  static validateUpdate = (prod : IProduct, errors : ValidationError[]) => {
    let valid : Boolean = true;

    if (!prod.id) {
      errors.push(
        {field: "id",
        message: "Id cannot be null"
        }
      )
      valid = false;
    }
    if (prod.description === '') {
      errors.push(
        {field: "description",
        message: "Description cannot be null"
        }
      )
      valid = false;
    }
    return valid;
  }
}