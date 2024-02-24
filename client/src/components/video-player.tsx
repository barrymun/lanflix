import { Box, Text } from "@radix-ui/themes";
import { FC } from "react";

interface VideoPlayerProps {
  filepath: string | null;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ filepath }) => {
  if (!filepath) {
    return <Text>Loading</Text>;
  }

  return (
    <Box>
      <video controls controlsList="nodownload">
        <source src={`http://localhost:3001/stream/${encodeURIComponent(filepath)}`} type="video/mp4" />
        <Text>Your browser does not support the video tag.</Text>
      </video>
    </Box>
  );
};

export { VideoPlayer };
