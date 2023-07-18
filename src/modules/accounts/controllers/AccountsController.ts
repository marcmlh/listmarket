import { Request, Response } from "express";
import { container } from "tsyringe";
import { AccountsService } from "../services/AccountsService";
import { DefaultResponse } from "../../../global/DefaultReponse";

export class AccountsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_name, password, email } = request.body;

    const accountsService = container.resolve(AccountsService);

    const user = await accountsService.create(user_name, password, email);

    return response.status(201).json(new DefaultResponse(user, true, 201));
  }

  async findByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const accountsService = container.resolve(AccountsService);

    const user = await accountsService.findByEmail(email?.toString());

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }

  async deleteByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const accountsService = container.resolve(AccountsService);

    await accountsService.deleteByEmail(email?.toString());

    return response
      .status(200)
      .json(new DefaultResponse("User was successfully deleted", true, 200));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;
    const { user_id } = request.params;

    const accountsService = container.resolve(AccountsService);

    const user = await accountsService.update(user_id, name, password, email);

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const accountsService = container.resolve(AccountsService);

    const user = await accountsService.authenticate(email, password);

    return response.status(200).json(new DefaultResponse(user, true, 200));
  }
}
