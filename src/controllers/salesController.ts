import { db } from '../db/db';
import { Action } from '../models/basicModel';
import { ISale, Sale } from '../models/Sale';
import { ISaleItems, SaleItems } from '../models/saleitem';
import { ValidationError } from '../models/types';
import { SaleValidations } from '../validation/SaleValidation';

export class SaleController {
  newSale = async (data: ISale, errors: ValidationError[]) => {
    if (SaleValidations.validateInsert(data, errors)) {
      await Sale.create(data, {
        include: [
          {
            model: db.model('SaleItems'),
            as: 'SaleItems',
          },
        ],
      });
      return true;
    }
    return false;
  };

  updateSaleItems = async (
    data: ISaleItems[],
    errors: ValidationError[],
  ) => {
    for (const item of data) {
      switch (item.action) {
        case Action.insert: {
          if (SaleValidations.validateSaleItem(item, errors)) {
            await SaleItems.create(item);
          }
          break;
        }
        case Action.update: {
          if (SaleValidations.validateSaleItem(item, errors)) {
            await SaleItems.update(item, {
              where: {
                id: (item as SaleItems).id,
              },
            });
          }
          break;
        }
        case Action.delete: {
          await SaleItems.destroy({
            where: {
              id: (item as SaleItems).id,
            },
          });
          break;
        }
      }
    }

    return false;
  };

  updateSale = async (data: ISale, errors: ValidationError[]) => {
    const t = await db.transaction();
    let result = false;
    try {
      if (SaleValidations.validateUpdate(data as Sale, errors)) {
        await Sale.update(data, {
          where: {
            id: (data as Sale).id,
          },
        });
        await this.updateSaleItems(data.SaleItems, errors);
        await t.commit();
        result = true;
      }
      result = false;
      await t.commit();
      return result;
    } catch (ex) {
      await t.rollback();
      throw ex;
    }
  };

  deleteSale = async (data: ISale, errors: ValidationError[]) => {
    await Sale.destroy({
      where: {
        id: (data as Sale).id,
      },
    });
    return true;
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

  save = async (data: ISale, errors: ValidationError[]) => {
    switch (data.action) {
      case Action.insert: {
        return await this.newSale(data, errors);
      }
      case Action.update: {
        return await this.updateSale(data, errors);
      }
      case Action.delete: {
        return await this.deleteSale(data, errors);
      }
    }
  };
}
