import { ObjectSchema } from "@hapi/joi";
import ErrorObj from "../types/Error";
import { Request, Response, NextFunction } from "express";

const requestBody =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const errorObj = error as ErrorObj;
      return res.status(400).json({ message: errorObj.message });
    }
  };

export default requestBody;
