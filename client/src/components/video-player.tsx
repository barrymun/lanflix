import { Box, Text } from "@radix-ui/themes";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useLocalStorage } from "hooks";
import { baseUrl } from "utils";

interface VideoPlayerProps {
  filepath: string | null;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ filepath }) => {
  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement>(null);

  const { getValue, setValue } = useLocalStorage();

  useEffect(() => {
    if (!filepath) {
      return;
    }
    const currentTime = getValue(filepath);
    if (currentTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(currentTime);
    }
  }, [filepath]);

  if (!filepath) {
    return <Text>{t("video-player.loading")}</Text>;
  }

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime;
    if (currentTime) {
      setValue(filepath, currentTime.toString());
    }
  };

  return (
    <Box>
      <video ref={videoRef} controls controlsList="nodownload" onTimeUpdate={handleTimeUpdate}>
        <source src={`${baseUrl}/stream/${encodeURIComponent(filepath)}`} type="video/mp4" />
        <Text>{t("video-player.no-video-support")}</Text>
      </video>
    </Box>
  );
};

export { VideoPlayer };
