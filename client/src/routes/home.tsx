import { ArchiveIcon } from "@radix-ui/react-icons";
import { Box, Card, Text } from "@radix-ui/themes";
import { GetMediaResponse, mediaPath } from "common";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMedia, sortContentsByType } from "utils";

const Home = () => {
  const { path } = useParams();

  const [filepath, setFilepath] = useState<string>(mediaPath);
  const [files, setFiles] = useState<GetMediaResponse["contents"]>([]);
  const [directories, setDirectories] = useState<GetMediaResponse["contents"]>([]);

  const fetchMedia = async () => {
    console.log(path);
    const r = await getMedia(path ?? filepath);
    console.log(r);
    const { files, directories } = sortContentsByType(r.contents);
    setFiles(files);
    setDirectories(directories);
  };

  useEffect(() => {
    fetchMedia();
  }, [path]);

  return (
    <Box className="p-4">
      <Box className="flex gap-4">
        <Box className="h-side-bar w-side-bar overflow-y-scroll">
          <Box className="pb-4">
            <Text className="text-3xl">Directories</Text>
          </Box>
          <Box className="flex flex-col gap-2">
            {directories.map((directory, index) => (
              <Card key={index} className="w-100">
                <Box className="flex gap-2 items-center">
                  <Box>
                    <ArchiveIcon />
                  </Box>
                  <Text>
                    <Link to={`/${encodeURIComponent(directory.path)}`}>{directory.name}</Link>
                  </Text>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        <Box>
          <Box className="pb-4">
            <Text className="text-3xl">Movies</Text>
          </Box>
          <Box className="flex flex-wrap gap-4">
            {files.map((file, index) => (
              <Card key={index} className="w-48">
                <Text>
                  <Link to={`/movies/${encodeURIComponent(file.path)}`}>{file.name}</Link>
                </Text>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { Home };
