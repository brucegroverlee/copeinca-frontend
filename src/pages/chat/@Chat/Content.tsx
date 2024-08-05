import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { styled } from "@mui/material/styles";

import { MessagesContext } from "../models/MessagesProvider";
import { MemoizedMessage } from "./@Content/Message";
import { useAutoScroll } from "../models/useAutoScroll";

const ScrollableStack = styled(Stack)(({ theme }) => ({
  height: "calc(100dvh - 52px)",
  overflowY: "auto",
  padding: theme.spacing(2),
  paddingTop: "56px",
  gap: theme.spacing(2),
}));

export const Content = () => {
  const { messages, isAnswerPending } = useContext(MessagesContext);
  const { containerRef, isAtBottom, scrollToBottom } = useAutoScroll({
    messages,
  });

  return (
    <ScrollableStack ref={containerRef}>
      {messages.map((message, index) => (
        <MemoizedMessage key={index} message={message} />
      ))}

      {isAnswerPending && (
        <MemoizedMessage
          message={{
            role: "assistant",
            content: (
              <>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </>
            ),
          }}
        />
      )}

      {!isAtBottom && (
        <IconButton
          onClick={() => scrollToBottom()}
          sx={{
            position: "absolute",
            bottom: 62,
            right: 0,
          }}
        >
          <KeyboardDoubleArrowDownRoundedIcon fontSize="large" />
        </IconButton>
      )}
    </ScrollableStack>
  );
};
