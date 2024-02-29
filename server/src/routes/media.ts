import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

import { ErrorResponse, GetMediaResponse, PosterType, mediaPath } from "common";
import { Request, Response } from "express";

import { getOMDbData, saveMoviePoster } from "utils/helpers";
import { CustomReq } from "utils/types";

interface ReqBody {}

async function findContents(dir: string | undefined = mediaPath): Promise<GetMediaResponse["contents"]> {
  const contents: GetMediaResponse["contents"] = [];
  const completePath = dir.includes(mediaPath) ? dir : `${mediaPath}${dir}`;
  const files = readdirSync(completePath);

  for (const file of files) {
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
        // poster: undefined, // TODO: add this in for faster loading?
      });
    }
  }

  return contents;
}

export async function getMedia(req: CustomReq<ReqBody>, res: Response<GetMediaResponse | ErrorResponse>) {
  try {
    const { filepath } = req.params;
    const contents = await findContents(filepath);
    res.json({ contents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPoster(req: Request, res: Response) {
  try {
    const { filepath } = req.params;
    const completePath = filepath.includes(mediaPath) ? filepath : `${mediaPath}${filepath}`;
    let fileExtension: PosterType | null = null;
    if (
      !existsSync(completePath.replace(".mp4", ".png")) &&
      !existsSync(completePath.replace(".mp4", ".jpg")) &&
      !existsSync(completePath.replace(".mp4", ".jpeg"))
    ) {
      const omdbData = await getOMDbData(completePath);
      if (omdbData && omdbData.Poster) {
        console.log({ omdbData });
        fileExtension = await saveMoviePoster({ path: completePath, url: omdbData.Poster });
      }
    } else {
      if (existsSync(completePath.replace(".mp4", ".png"))) {
        fileExtension = "png";
      } else if (existsSync(completePath.replace(".mp4", ".jpg"))) {
        fileExtension = "jpg";
      } else if (existsSync(completePath.replace(".mp4", ".jpeg"))) {
        fileExtension = "jpeg";
      }
    }
    console.log({ fileExtension });
    const data = readFileSync(completePath.replace(".mp4", `.${fileExtension}`));
    res.setHeader("Content-Type", `image/${fileExtension}`);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
