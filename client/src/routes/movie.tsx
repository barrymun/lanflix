import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { VideoPlayer } from "components";

const Movie = () => {
  const { path } = useParams();

  const [moviePath, setMoviePath] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      return;
    }
    setMoviePath(decodeURIComponent(path));
  }, []);

  return (
    <>
      <Text>{moviePath ?? ""}</Text>
      <VideoPlayer filepath={moviePath} />
    </>
  );
};

export { Movie };
