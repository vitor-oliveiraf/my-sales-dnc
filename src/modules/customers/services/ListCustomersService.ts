import { customerRepositories } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";

export default class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customers = await customerRepositories.find();
    return customers;
  }
}
