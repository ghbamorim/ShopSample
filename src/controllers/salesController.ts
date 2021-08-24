import { Sale, ISale } from '../models/Sale';
import { db } from '../db/db';
import { SaleItems } from '../models/saleitem';
import { ValidationError } from '../models/types';
import { SaleValidations } from '../validation/SaleValidation';
const { Sequelize } = require('sequelize');

export class SaleController {
  newSale = async (data: ISale, errors: ValidationError[]) => {
    const sale = await Sale.build(data);
    if (SaleValidations.validateInsert(sale, errors)) {
      await sale.save();
      return true;
    }
    return false;
  };

  updateSale = async (data: ISale, errors: ValidationError[]) => {
    if (SaleValidations.validateUpdate(data as Sale, errors)) {
      await Sale.update(data, {
        where: {
          id: (data as Sale).id,
        },
      });
      return true;
    }
    return false;
  };

  getSales = async () => {
    const result = await Sale.findAll({
      include: [
        {
          model: db.model('SaleItems'),
          as: 'SaleItems',
        },
      ],
    });
    return result as Sale[];
  };
}
