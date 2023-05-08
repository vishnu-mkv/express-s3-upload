import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { s3 } from "./s3";

const { AWS_S3_BUCKET }: any = process.env;

// Configure multer-s3 storage
const uploadTo = (dest: getDestinationFolder = () => "uploads", limit = 5) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET,
      acl: "private", // Set ACL to private for generating pre-signed URLs
      key: function (req: Request, file, cb) {
        cb(null, dest(req) + "/" + Date.now() + "-" + file.originalname);
      },
    }),
    limits: { fileSize: 1024 * 1024 * limit }, // 5 MB file size limit
    fileFilter: function (req, file, cb) {
      // Check file type, if you want to restrict to specific image types
      console.log("file type -", file.mimetype);
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"));
      }
    },
  });

type getDestinationFolder = (req?: Request) => String;

export default uploadTo;
