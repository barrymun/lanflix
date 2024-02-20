import "dotenv/config";

import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

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

  app.get("/stream/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      console.log({ filename });
      // const moviePath = join(__dirname, "/Users/barrymun/Documents/movies", filename);
      const moviePath = join("/usr/src/movies", "Alien DC (1979) [1080p]/Alien.Directors.Cut.1979.1080p.mp4");
      console.log({ moviePath });

      // Check if the file exists
      // const fileExists = existsSync(moviePath);
      // if (!fileExists) {
      //   return res.status(404).json({ error: "File not found" });
      // }

      // // Set appropriate headers for streaming
      // res.setHeader("Content-Type", "video/mp4");

      // // Stream the movie to the client
      const stream = createReadStream(moviePath);
      console.log({ stream });
      // stream.pipe(res);
      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.listen(3001);
})();
