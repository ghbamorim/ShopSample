import { db } from '../db/db';
import { ISale, Sale } from '../models/Sale';
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
    /*return await Sale.findAll({
      include: [
        {
          model: db.model('SaleItems'),
          as: 'SaleItems',
        }
      ],
    });*/

    return await Sale.findAll({
      include: { all: true, nested: true },
    });
  };
}
