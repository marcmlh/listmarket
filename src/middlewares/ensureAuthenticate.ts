import { NextFunction, Request, Response } from "express";
import { DefaultResponse } from "../global/DefaultReponse";
import { verify } from "jsonwebtoken";
import { AccountsRepository } from "../modules/accounts/repositories/AccountsRepository";

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken || authToken == "") {
    throw new DefaultResponse("Token is missing", false, 401);
  }

  const [, token] = authToken.split(" ");

  try {
    /* @ts-ignore */
    const { sub, email } = verify(token, "marceloabcde1234");

    const accountsRepository = new AccountsRepository();
    const account = await accountsRepository.findById(sub.toString());

    if (!account) {
      throw new DefaultResponse("User not found!", false, 401);
    }

    /* @ts-ignore */
    request.user_id = sub;
    /* @ts-ignore */
    request.email = email;

    next();
  } catch (error) {
    throw new DefaultResponse("Validation failed!", false, 401);
  }
}
