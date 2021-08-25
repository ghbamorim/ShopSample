import { Sale, ISale } from '../models/Sale';
import { ISaleItems } from '../models/saleitem';
import { ValidationError } from '../models/types';

export class SaleValidations {
  static validateInsert = (
    data: ISale,
    errors: ValidationError[],
  ) => {
    let valid = true;
    if (data.description === '') {
      errors.push({
        field: 'description',
        message: 'Description cannot be null',
      });
      valid = false;
    }
    if (data.SaleItems.length === 0) {
      errors.push({
        field: 'SaleItems',
        message: 'Sale must have sale items',
      });
      valid = false;
    }
    return valid;
  };

  static validateUpdate = (
    data: ISale,
    errors: ValidationError[],
  ) => {
    let valid: Boolean = true;

    if (!data.id) {
      errors.push({ field: 'id', message: 'Id cannot be null' });
      valid = false;
    }
    if (data.description === '') {
      errors.push({
        field: 'description',
        message: 'Description cannot be null',
      });
      valid = false;
    }
    return valid;
  };

  static validateSaleItem = (
    data: ISaleItems,
    errors: ValidationError[],
  ) => {
    if (data.Qti === 0 || null) {
      errors.push({
        field: 'Qti',
        message: 'Qti cannot be null',
      });
      return false;
    }
    return true;
  };
}
