import { NextFunction, Request, Response } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authourization required." });
  }

  // further check token validation and user validation

  next();
};
