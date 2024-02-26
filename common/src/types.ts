export interface ErrorResponse {
  error: string;
}
export interface GetMediaResponse {
  contents: {
    name: string;
    path: string;
    type: "file" | "directory";
  }[];
}
