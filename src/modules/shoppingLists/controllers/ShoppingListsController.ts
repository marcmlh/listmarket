import { Request, Response } from "express";
import { container } from "tsyringe";
import { DefaultResponse } from "../../../global/DefaultReponse";
import { z } from "zod";
import { ShoppingListsService } from "../services/ShoppingListsService";

export class ShoppingListsController {
  async create(request: Request, response: Response): Promise<Response> {
    const createObject = z.object({
      list_name: z.string(),
    });

    const { list_name } = createObject.parse(request.body);

    const shoppingListsService = container.resolve(ShoppingListsService);

    const list = await shoppingListsService.create(request.user_id, list_name);

    return response.status(201).json(new DefaultResponse(list, true, 201));
  }

  async findByName(request: Request, response: Response): Promise<Response> {
    const requestObject = z.object({
      list_name: z.string(),
    });

    const { list_name } = requestObject.parse(request.query);

    const shoppingListsService = container.resolve(ShoppingListsService);

    const list = await shoppingListsService.findByName(list_name);

    return response.status(200).json(new DefaultResponse(list, true, 200));
  }

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const shoppingListsService = container.resolve(ShoppingListsService);

    const list = await shoppingListsService.findByUserId(request.user_id);

    return response.status(200).json(new DefaultResponse(list, true, 200));
  }

  async deleteByName(request: Request, response: Response): Promise<Response> {
    const deleteObject = z.object({
      list_name: z.string(),
    });

    const { list_name } = deleteObject.parse(request.query);

    const shoppingListsService = container.resolve(ShoppingListsService);

    await shoppingListsService.deleteByName(list_name);

    return response
      .status(200)
      .json(new DefaultResponse("List was successfully deleted", true, 200));
  }

  async patch(request: Request, response: Response): Promise<Response> {
    const { list_id } = request.params;

    const {operations} = request.body;

    const shoppingListsService = container.resolve(ShoppingListsService);

    const list = await shoppingListsService.patch(
      list_id,
      operations
    );

    return response.status(200).json(new DefaultResponse(list, true, 200));
  }
}
