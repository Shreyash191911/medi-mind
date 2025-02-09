import { NextApiRequest } from "next";

declare module "next" {
    interface NextApiRequest {
        files?: Express.Multer.File[]; // Add the files property
    }
}