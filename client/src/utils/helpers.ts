import { GetMediaResponse } from "common";

export function sortContentsByType(contents: GetMediaResponse["contents"]) {
  const sortedContents: { files: GetMediaResponse["contents"]; directories: GetMediaResponse["contents"] } = {
    files: [],
    directories: [],
  };

  contents.forEach((item) => {
    if (item.type === "file") {
      sortedContents.files.push(item);
    } else if (item.type === "directory") {
      sortedContents.directories.push(item);
    }
  });

  return sortedContents;
}
