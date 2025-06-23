import { Customer } from "../database/entities/Curtomer";
import { customerRepositories } from "../database/repositories/CustomerRepositories";
import AppError from "../../../shared/errors/AppError";

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError("Customer already exists", 409);
    }

    const customer = customerRepositories.create({ name, email });

    await customerRepositories.save(customer);

    return customer;
  }
}
