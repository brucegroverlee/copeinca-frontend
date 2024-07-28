import { memo } from "react";

import { MessagesProvider } from "./models/MessagesProvider";
import { Chat } from "./Chat";

const ChatController = () => {
  return <Chat />;
};

export const MemoizedChatController = memo(() => (
  <MessagesProvider>
    <ChatController />
  </MessagesProvider>
));
