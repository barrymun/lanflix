import { Box, Card, Text } from "@radix-ui/themes";

const Home = () => {
  return (
    <>
      <Box className="p-4 flex gap-4">
        <Card className="w-48">
          <Text>Home</Text>
        </Card>
      </Box>
      <video controls>
        <source src="http://localhost:3001/stream/test" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export { Home };
