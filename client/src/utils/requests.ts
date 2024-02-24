import { GetMediaResponse } from "common";

import { baseUrl } from "utils";

export async function getMedia() {
  const res = await fetch(`${baseUrl}/media`);
  return (await res.json()) as GetMediaResponse;
}
