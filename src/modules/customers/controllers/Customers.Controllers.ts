import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCurtomerService from "../services/DeleteCurtomerService";
import ListCustomersService from "../services/ListCustomersService";

export default class CustomersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({ name, email });
    return response.status(201).json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute();
    return response.status(200).json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const showCustomer = new ShowCustomerService();
    const customer = await showCustomer.execute({ id });
    return response.status(200).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({ id, name, email });
    return response.status(200).json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const deleteCustomer = new DeleteCurtomerService();
    await deleteCustomer.execute({ id });
    return response.status(204).send();
  }
}
