import Box from "@mui/material/Box";

import { Header } from "./@Chat/Header";
import { Content } from "./@Chat/Content";
import { InputBar } from "./@Chat/InputBar";

export const Chat = () => {
  return (
    <Box height="100dvh">
      <Header />
      <Content />
      <InputBar />
    </Box>
  );
};
