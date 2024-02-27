import { readdirSync, statSync } from "fs";
import { join } from "path";

import { ErrorResponse, GetMediaResponse, mediaPath } from "common";
import { Response } from "express";

import { CustomReq } from "utils/types";

interface ReqBody {}

function findContents(dir: string | undefined = mediaPath): GetMediaResponse["contents"] {
  const contents: GetMediaResponse["contents"] = [];
  const completePath = dir.includes(mediaPath) ? dir : `${mediaPath}${dir}`;
  const files = readdirSync(completePath);

  files.forEach((file) => {
    const filePath = join(completePath, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      contents.push({
        name: file,
        path: filePath.replace(mediaPath, ""),
        type: "directory",
      });
    } else if (file.endsWith(".mp4")) {
      contents.push({
        name: file,
        path: filePath.replace(mediaPath, ""),
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
