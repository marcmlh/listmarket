import { Request, Response } from "express";
import { container } from "tsyringe";
import { DefaultResponse } from "../../../global/DefaultReponse";
import { z } from "zod";
import { ItemsListService } from "../services/ItemsListService";

export class ItemsListController {
  async create(request: Request, response: Response): Promise<Response> {
    const createObject = z.object({
      list_id: z.string(),
      product_id: z.string(),
      quantity: z.number(),
    });

    const { list_id, product_id, quantity } = createObject.parse(request.body);

    const itemsListService = container.resolve(ItemsListService);

    const list = await itemsListService.create(list_id, product_id, quantity);

    return response.status(201).json(new DefaultResponse(list, true, 201));
  }

  async findByListId(request: Request, response: Response): Promise<Response> {
    const requestObject = z.object({
      list_id: z.string(),
    });

    const { list_id } = requestObject.parse(request.query);

    const itemsListService = container.resolve(ItemsListService);

    const items = await itemsListService.findByListId(list_id);

    return response.status(200).json(new DefaultResponse(items, true, 200));
  }

  async deleteByItemListId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const requestObject = z.object({
      itemList_id: z.string(),
    });

    const { itemList_id } = requestObject.parse(request.query);

    const itemsListService = container.resolve(ItemsListService);

    const item = await itemsListService.deleteByItemListId(itemList_id);

    return response.status(200).json(new DefaultResponse(item, true, 200));
  }

  async patch(request: Request, response: Response): Promise<Response> {
    const { itemList_id } = request.params;
    const { operations } = request.body;

    const itemsListService = container.resolve(ItemsListService);

    const itemPatched = await itemsListService.patch(itemList_id, operations);

    return response
      .status(200)
      .json(new DefaultResponse(itemPatched, true, 200));
  }
}
