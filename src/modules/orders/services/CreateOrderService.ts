import { Product } from "../../products/infra/database/entities/Product";
import Order from "../infra/database/entities/Order";
import AppError from "../../../shared/errors/AppError";
import { customerRepositories } from "../../customers/infra/database/repositories/CustomerRepositories";
import { productsRepositories } from "../../products/infra/database/repositories/ProductsRepositories";
import { orderRepositories } from "../infra/database/repositories/OrderRepositories";

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepositories.findById(
      Number(customer_id)
    );
    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id");
    }

    // Validar se há produtos com quantidade <= 0
    const invalidQuantityProducts = products.filter(
      (product) => product.quantity <= 0
    );

    if (invalidQuantityProducts.length > 0) {
      throw new AppError(
        `Product ${invalidQuantityProducts[0].id} has invalid quantity. Quantity must be greater than 0.`,
        400
      );
    }

    const productsExists = await productsRepositories.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError("Could not find any products with the given ids");
    }

    const existsProductsIds = productsExists.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    // Validação se todos os produtos existem no banco de dados
    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
        404
      );
    }

    const quantityAvailable = products.filter((product) => {
      const productStock = productsExists.filter(
        (productExisten) => productExisten.id === product.id
      );

      return productStock[0].quantity < product.quantity;
    });

    if (quantityAvailable.length) {
      throw new AppError("The quantity is not available.", 409);
    }

    const serializedProducts = products.map((product) => ({
      product_id: Number(product.id),
      quantity: product.quantity,
      price: productsExists.filter(
        (productExists) => productExists.id === product.id
      )[0].price,
    }));

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    for (const orderProduct of order_products) {
      const productToUpdate = productsExists.find(
        (product) => Number(product.id) === Number(orderProduct.product_id)
      );

      if (productToUpdate) {
        productToUpdate.quantity -= orderProduct.quantity;
        await productsRepositories.save(productToUpdate);
      }
    }

    return order;
  }
}
