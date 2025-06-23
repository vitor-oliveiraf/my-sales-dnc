import { Customer } from "../database/entities/Curtomer";
import { customerRepositories } from "../database/repositories/CustomerRepositories";
import AppError from "../../../shared/errors/AppError";

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await customerRepositories.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    if (name) {
      if (name === customer.name) {
        throw new AppError("Name is the same as the current name", 400);
      }

      customer.name = name;
    }

    if (email) {
      const emailCustomerExists = await customerRepositories.findByEmail(email);

      if (email === customer.email) {
        throw new AppError("Email is the same as the current email", 400);
      }

      if (emailCustomerExists && emailCustomerExists.email !== email) {
        throw new AppError("Email already exists", 409);
      }

      customer.email = email;
    }

    await customerRepositories.save(customer);

    return customer;
  }
}
