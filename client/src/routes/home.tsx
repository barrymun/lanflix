import { Box, Card, Text } from "@radix-ui/themes";
import { GetMediaResponse } from "common";
import { useEffect, useState } from "react";

// import { VideoPlayer } from "components";
import { getMedia } from "utils";

const Home = () => {
  const [movies, setMovies] = useState<GetMediaResponse["movies"]>([]);

  const fetchMedia = async () => {
    const r = await getMedia();
    console.log(r);
    setMovies(r.movies);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      {/* <VideoPlayer /> */}
      <Box className="p-4 flex flex-wrap gap-4">
        {movies.map((movie, index) => (
          <Card key={index} className="w-48">
            <Text>{movie.name}</Text>
          </Card>
        ))}
      </Box>
    </>
  );
};

export { Home };
