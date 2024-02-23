import { GetMediaResponse } from "utils";

const baseUrl = process.env.REACT_APP_API_URL as string;

export async function getMedia() {
  const res = await fetch(`${baseUrl}/media`);
  return (await res.json()) as GetMediaResponse;
}
