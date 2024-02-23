import { Box, Card, Text } from "@radix-ui/themes";
import { useEffect } from "react";

import { getMedia } from "utils";

// import { VideoPlayer } from "components";

const Home = () => {
  const fetchMedia = async () => {
    const r = await getMedia();
    console.log(r);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <>
      <Box className="p-4 flex gap-4">
        <Card className="w-48">
          <Text>Home</Text>
        </Card>
      </Box>
      {/* <VideoPlayer /> */}
    </>
  );
};

export { Home };
