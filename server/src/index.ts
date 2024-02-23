import "dotenv/config";

import { createServer } from "http";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { getMedia } from "routes/media";
import { streamFile } from "routes/stream";

(() => {
  if (!process.env.CORS_ORIGIN) {
    throw new Error("CORS_ORIGIN env variable is required");
  }
  console.log(process.env.CORS_ORIGIN);
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
  };

  const app = express();
  const server = createServer(app);
  const jsonParser = bodyParser.json();

  app.use(cors(corsOptions));

  app.get("/media", getMedia);
  app.get("/stream/:filename", streamFile);

  server.listen(3001);
})();
