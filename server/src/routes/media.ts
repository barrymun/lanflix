import { readdirSync, statSync } from "fs";
import { join } from "path";

import { ErrorResponse, GetMediaResponse } from "common";
import { Response } from "express";

import { CustomReq } from "utils/types";

interface ReqBody {}

function findContents(dir: string): GetMediaResponse["contents"] {
  const contents: GetMediaResponse["contents"] = [];
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // contents = contents.concat(findContents(filePath));
      contents.push({
        name: file,
        path: filePath,
        type: "directory",
      });
    } else if (file.endsWith(".mp4")) {
      contents.push({
        name: file,
        path: filePath,
        type: "file",
      });
    }
  });

  return contents;
}

export function getMedia(req: CustomReq<ReqBody>, res: Response<GetMediaResponse | ErrorResponse>) {
  try {
    const { filepath } = req.params;
    const contents = findContents(filepath);
    res.json({ contents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
