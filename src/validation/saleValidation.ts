import { Sale, ISale } from '../models/Sale';
import { ValidationError } from '../models/types';

export class SaleValidations {
  static validateInsert = (
    prod: ISale,
    errors: ValidationError[],
  ) => {
    if (prod.description === '') {
      errors.push({
        field: 'description',
        message: 'Description cannot be null',
      });
      return false;
    }
    return true;
  };

  static validateUpdate = (
    prod: ISale,
    errors: ValidationError[],
  ) => {
    let valid: Boolean = true;

    if (!prod.id) {
      errors.push({ field: 'id', message: 'Id cannot be null' });
      valid = false;
    }
    if (prod.description === '') {
      errors.push({
        field: 'description',
        message: 'Description cannot be null',
      });
      valid = false;
    }
    return valid;
  };
}
