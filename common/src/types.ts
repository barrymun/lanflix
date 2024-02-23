export interface ErrorResponse {
  error: string;
}
export interface GetMediaResponse {
  movies: {
    name: string;
    path: string;
  }[];
}
