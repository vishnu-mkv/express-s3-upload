import express from "express";

export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || "ERROR";

  console.log(err);

  const data: { code: string; message: string; data?: any; ok: false } = {
    message,
    ok: false,
    code,
  };

  if (err.data) data.data = err.data;

  res.status(statusCode).json(data);
};
