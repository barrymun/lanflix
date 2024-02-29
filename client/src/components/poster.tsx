import { FC, useEffect, useState } from "react";

import { getPoster } from "utils";

interface VideoPlayerProps {
  filepath: string | undefined;
}

const Poster: FC<VideoPlayerProps> = ({ filepath }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const fetchPoster = async (filepath: string) => {
    const blob = await getPoster(filepath);
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    if (!filepath) {
      return;
    }
    fetchPoster(filepath);
  }, [filepath]);

  if (!imageSrc) {
    return null;
  }

  return <img src={imageSrc} alt={filepath} />;
};

export { Poster };
