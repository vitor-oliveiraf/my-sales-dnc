import { Customer } from "../../../infra/database/entities/Customer";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";

export const customerRepositories = AppDataSource.getRepository(
  Customer
).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOneBy({
      name,
    });

    return customer;
  },
  async findById(id: number): Promise<Customer | null> {
    const customer = await this.findOneBy({
      id,
    });

    return customer;
  },
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOneBy({
      email,
    });

    return customer;
  },
});
