import { ArchiveIcon } from "@radix-ui/react-icons";
import { Box, Card, Text } from "@radix-ui/themes";
import { GetMediaResponse } from "common";
import { FC, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Poster } from "components";
import { useSideMenu, useTheme } from "hooks";
import { convertPathToBreadcrumbs, getBgColor, getMedia, sortContentsByType } from "utils";

const Home = () => {
  const navigate = useNavigate();
  const { path } = useParams();
  const { appearance } = useTheme();
  const { open: menuOpen, setOpen } = useSideMenu();

  const [files, setFiles] = useState<GetMediaResponse["contents"]>([]);
  const [directories, setDirectories] = useState<GetMediaResponse["contents"]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const bgColor = useMemo(() => getBgColor(appearance), [appearance]);

  const fetchMedia = async () => {
    const r = await getMedia(path ?? "");
    console.log(r.contents);
    const { files, directories } = sortContentsByType(r.contents);
    setFiles(files);
    setDirectories(directories);
    setBreadcrumbs(convertPathToBreadcrumbs(path ?? ""));
  };

  useEffect(() => {
    fetchMedia();
  }, [path]);

  const Directories: FC = () => {
    return (
      <>
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
                <Text
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`/${encodeURIComponent(directory.path)}`);
                    setOpen(false);
                  }}
                >
                  {directory.name}
                </Text>
              </Box>
            </Card>
          ))}
        </Box>
      </>
    );
  };

  return (
    <Box className="p-4">
      <Box className="flex gap-4">
        {/* directories */}
        {/* side menu small screens */}
        {menuOpen && (
          <Box
            className={`
              fixed 
              top-16
              left-0
              w-full 
              h-[calc(100%-4rem)] 
              overflow-y-scroll 
              z-10 
              ${bgColor}
              md:hidden
            `}
          >
            <Box className="p-4">
              <Directories />
            </Box>
          </Box>
        )}
        {/* side menu large screens */}
        <Box className="h-side-menu w-side-menu overflow-y-scroll hidden md:block">
          <Directories />
        </Box>
        {/* movies */}
        <Box>
          <Box className="pb-4">
            <Text className="text-3xl">Movies</Text>
          </Box>
          <Box className="pb-4">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index < breadcrumbs.length - 1 ? (
                  <Link to={`/${encodeURIComponent(`/${crumb}`)}`}>{crumb}</Link>
                ) : (
                  <span>{crumb}</span>
                )}
                {index < breadcrumbs.length - 1 && <span> / </span>}
              </span>
            ))}
          </Box>
          <Box className="flex flex-wrap gap-4">
            {files.map((file, index) => (
              <Card key={index} className="w-48">
                <Poster filepath={file.path} />
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
