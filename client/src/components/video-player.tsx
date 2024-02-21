import { Box, Text } from "@radix-ui/themes";
import { FC } from "react";

interface VideoPlayerProps {}

const VideoPlayer: FC<VideoPlayerProps> = () => {
  return (
    <Box>
      <video controls controlsList="nodownload">
        <source src="http://localhost:3001/stream/test" type="video/mp4" />
        <Text>Your browser does not support the video tag.</Text>
      </video>
    </Box>
  );
};

export { VideoPlayer };
