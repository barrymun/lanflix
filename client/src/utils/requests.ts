import { GetMediaResponse } from "common";

import { baseUrl } from "utils";

export async function getMedia(filepath: string) {
  const res = await fetch(`${baseUrl}/media/${encodeURIComponent(filepath)}`);
  return (await res.json()) as GetMediaResponse;
}

export async function getPoster(filepath: string) {
  const res = await fetch(`${baseUrl}/poster/${encodeURIComponent(filepath)}`);
  return res.blob();
}
