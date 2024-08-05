import { memo } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { MessageDto } from "../../models/MessageDto";

interface Props {
  message: MessageDto;
}

const Message = ({ message }: Props) => {
  if (message.role === "user") {
    return (
      <Stack direction="row">
        <Avatar sx={{ width: 34, height: 34, mr: 2 }}>A</Avatar>

        <Stack>
          <Typography variant="subtitle2">Andrea</Typography>
          {message.content}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Avatar sx={{ width: 34, height: 34, mr: 2, bgcolor: "rgb(44, 79, 88)" }}>
        C
      </Avatar>

      <Stack flexGrow={1}>
        <Typography variant="subtitle2">Copebot</Typography>
        {message.content}
      </Stack>
    </Stack>
  );
};

export const MemoizedMessage = memo(Message);
