import { writeFileSync } from "fs";

import { OMDbApiResponseData, PosterType } from "common";

function getAfterLastSlash(input: string) {
  const lastSlashIndex = input.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return input; // Return the whole string if there's no slash
  } else {
    return input.substring(lastSlashIndex + 1); // Return substring after the last slash
  }
}

export function extractTitleAndYear(input: string): { title: string; year?: number } {
  const titleRegex = /^(.*?)(?=\s*\d{4}\b)/i;
  let formattedInput = getAfterLastSlash(input);
  formattedInput = formattedInput.replace(/\./g, " ");
  formattedInput = formattedInput.replace(/\bDirectors\s+Cut\b/i, "").trim();
  formattedInput = formattedInput.replace(".mp4", "").trim();
  formattedInput = formattedInput.replace("mp4", "").trim();
  console.log({ formattedInput });
  const match = formattedInput.match(titleRegex);
  console.log({ match });
  if (match) {
    const title = match[1].trim();
    const year = match[2] ? parseInt(match[2], 10) : undefined;
    return { title, year };
  }
  if (formattedInput.length > 4) {
    return { title: formattedInput };
  }
  return { title: input };
}

export async function getOMDbData(filename: string): Promise<OMDbApiResponseData | null> {
  try {
    if (!process.env.OMDB_API_KEY) {
      return null;
    }
    const { title, year } = extractTitleAndYear(filename);
    console.log({ title, year });
    let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;
    if (year) {
      url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}&y=${year.toString()}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as OMDbApiResponseData; // TODO: fix as json still returned if movie not found
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function downloadMoviePoster(url: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    console.log("Image downloaded successfully.");
    return await response.arrayBuffer();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function saveMoviePoster({ path, url }: { path: string; url: string }): Promise<PosterType | null> {
  try {
    console.log({ url });
    const fileExtension = url.split(".").pop()?.toLowerCase() as PosterType | undefined;
    if (!fileExtension || !(["jpg", "jpeg", "png"] as PosterType[]).includes(fileExtension)) {
      return null;
    }
    const buffer = await downloadMoviePoster(url);
    if (!buffer) {
      return null;
    }
    writeFileSync(path.replace(".mp4", `.${fileExtension}`), Buffer.from(buffer));
    return fileExtension;
  } catch (error) {
    console.log(error);
    return null;
  }
}
