import { createReadStream, existsSync, statSync } from "fs";

import { mediaPath } from "common";
import { Response } from "express";

import { CustomReq } from "utils/types";

interface ReqBody {}

export function streamFile(req: CustomReq<ReqBody>, res: Response) {
  try {
    const { filepath } = req.params;
    const decodedFilePath = decodeURIComponent(filepath);
    const completePath = decodedFilePath.includes(mediaPath) ? decodedFilePath : `${mediaPath}${decodedFilePath}`;
    const fileExists = existsSync(decodeURIComponent(completePath));
    console.log({ completePath, fileExists });
    if (!fileExists) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const range = req.headers.range;
    const fileSize = statSync(completePath).size;
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
    const stream = createReadStream(completePath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
