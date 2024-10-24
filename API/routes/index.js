import express from 'express';
import { impresorasFileRouter } from "./impresoras.file.router.js";

const router = express.Router();

export function routerImpresoras(app) {
    app. use("/api/v1", router);

        router.use("/file/impresoras", impresorasFileRouter);
    
}
