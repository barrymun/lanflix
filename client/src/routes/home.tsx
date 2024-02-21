import { Box, Card, Text } from "@radix-ui/themes";

import { VideoPlayer } from "components";

const Home = () => {
  return (
    <>
      <Box className="p-4 flex gap-4">
        <Card className="w-48">
          <Text>Home</Text>
        </Card>
      </Box>
      <VideoPlayer />
    </>
  );
};

export { Home };
