import { readdirSync, statSync } from "fs";
import { join } from "path";

import { ErrorResponse, GetMediaResponse } from "common";
import { Response } from "express";

import { mediaPath } from "utils/consts";
import { CustomReq } from "utils/types";

interface ReqBody {}

function findMovies(dir: string): GetMediaResponse["movies"] {
  let movies: GetMediaResponse["movies"] = [];
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      movies = movies.concat(findMovies(filePath));
    } else if (file.endsWith(".mp4")) {
      movies.push({
        name: file,
        path: filePath,
      });
    }
  });

  return movies;
}

export function getMedia(_req: CustomReq<ReqBody>, res: Response<GetMediaResponse | ErrorResponse>) {
  try {
    const movies = findMovies(mediaPath);
    console.log({ movies });
    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
