import "dotenv/config";

import { createReadStream, statSync } from "fs";
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
      // const filePath = join(__dirname, "/Users/barrymun/Documents/movies", filename);
      const filePath = join("/usr/src/movies", "Alien DC (1979) [1080p]/Alien.Directors.Cut.1979.1080p.mp4");
      console.log({ filePath });

      // Check if the file exists
      // const fileExists = existsSync(filePath);
      // if (!fileExists) {
      //   return res.status(404).json({ error: "File not found" });
      // }

      const range = req.headers.range;
      console.log({ range });
      const fileSize = statSync(filePath).size;
      let start = 0;
      let end = fileSize - 1;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        start = parseInt(parts[0], 10);
        end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      }
      res.writeHead(206, {
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      });
      const stream = createReadStream(filePath, { start, end });
      stream.pipe(res);
      // res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  server.listen(3001);
})();
