import { customerRepositories } from "../database/repositories/CustomerRepositories";
import { Customer } from "../database/entities/Customer";
import { IPagination } from "../../../shared/interface/pagination.interface";

export default class ListCustomersService {
  public async execute(
    page: number = 1,
    limit: number = 10
  ): Promise<IPagination<Customer>> {
    const [data, total] = await customerRepositories.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total: total,
      total_pages: totalPages,
      current_page: page,
      per_page: limit,
      next_page: page < totalPages ? page + 1 : null,
      previous_page: page > 1 ? page - 1 : null,
    } as IPagination<Customer>;
  }
}
