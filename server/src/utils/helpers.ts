import { writeFileSync } from "fs";

import { OMDbApiResponseData } from "common";

export async function getOMDbData({
  title,
  year,
}: {
  title: string;
  year?: number;
}): Promise<OMDbApiResponseData | null> {
  try {
    if (!process.env.OMDB_API_KEY) {
      return null;
    }
    let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;
    if (year) {
      url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}&y=${year.toString()}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as OMDbApiResponseData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function downloadMoviePoster({ url, path }: { url: string; path: string }) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const buffer = await response.arrayBuffer();
    writeFileSync(path, Buffer.from(buffer));
    console.log("Image downloaded successfully.");
    return path;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getAfterLastSlash(input: string) {
  const lastSlashIndex = input.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return input; // Return the whole string if there's no slash
  } else {
    return input.substring(lastSlashIndex + 1); // Return substring after the last slash
  }
}

export function extractTitleAndYear(input: string): { title: string; year?: number } {
  // const titleRegex = /^(.*?)\s*(?:(?:DIRECTORS? CUT)|(?:\(\d{4}\)))?\s*(?:\[(\d{4})p\])?$/i;
  const titleRegex = /^(.*?)(?=\s*(?:DIRECTORS? CUT|\(\d{4}\)|\[\d{4}p\]|\.mp4|$))/i;
  const formattedInput = input.replace(/\./g, " ");
  const match = getAfterLastSlash(formattedInput).match(titleRegex);
  if (!match) {
    return { title: input };
  }

  const title = match[1].trim();
  const year = match[2] ? parseInt(match[2], 10) : undefined;
  return { title, year };
}
