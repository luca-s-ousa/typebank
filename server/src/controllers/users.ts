import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  console.log((req as any).account);
};
