import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { authenticate } from "./authenticate";
import uploadTo from "./upload";
import { errorHandler } from "./errorHandler";
import { signUrl } from "./s3";

// Create Express app
const app = express();

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes and other configurations as needed
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

interface MulterRequest extends Request {
  file: any;
}

app.post(
  "/upload",
  [authenticate, uploadTo().single("image")],

  async (req: Request, res: Response) => {
    const file = (req as MulterRequest).file;
    console.log("Uploaded image", file);
    // return res.json({ url: file.location });
    return res.json({ location: file.location, url: await signUrl(file.key) });
  }
);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Service listening on port 3000");
});
