import { Product, IProduct } from '../models/product';
import { ValidationError } from '../models/types';
import { ProductValidations } from '../validation/productValidation';

export class ProductController {
  newProduct = async (data: IProduct, errors: ValidationError[]) => {
    const product = await Product.build(data);
    if (ProductValidations.validateInsert(product, errors)) {
      await product.save();
      return true;
    }
    return false;
  };

  updateProduct = async (data: IProduct, errors: ValidationError[]) => {
    if (ProductValidations.validateUpdate(data as Product, errors)) {
      await Product.update(data, {
        where: {
          id: (data as Product).id,
        },
      });
      return true;
    }
    return false;
  };

  getProducts = async () => {
    return await Product.findAll();
  };
}
