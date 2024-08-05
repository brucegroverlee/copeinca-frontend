import { createContext, FormEvent, ReactNode, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@lib/api";
import { MessageDto } from "./MessageDto";

const USER_ID = "user_id";
const USER_SAP_ID = 2;
// const CHAT_ID = "default";

interface MessagesContextValue {
  messages: MessageDto[];
  isAnswerPending: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const MessagesContext = createContext<MessagesContextValue>({
  messages: [],
  isAnswerPending: false,
  handleSubmit: () => {},
});

interface Props {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: Props) => {
  const [threadId, setThreadId] = useState<string | null>(
    () => localStorage.getItem("thread_id") || null
  );
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      if (!threadId) return [];

      const params = new URLSearchParams();

      params.append("user_id", USER_ID);
      params.append("thread_id", threadId);

      const { data } = await api.get("/assistant/messages", { params });

      return data as MessageDto[];
    },
  });

  const messages = query.data || [];

  const setMessages = (newMessage: MessageDto) => {
    queryClient.setQueryData(
      ["messages", threadId],
      (prev: MessageDto[] | undefined) => {
        if (!prev) {
          return prev;
        }

        return [...prev, newMessage];
      }
    );
  };

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const { data } = await api.post("/assistant/messages", {
        user_id: USER_ID,
        user_sap_id: USER_SAP_ID,
        thread_id: threadId,
        content: message,
      });

      return data as MessageDto;
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;
    event.currentTarget.reset();

    setMessages({
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    });

    const reply = await mutation.mutateAsync(message);

    setMessages(reply);

    if (!threadId) {
      setThreadId(reply.thread_id!);
      localStorage.setItem("thread_id", reply.thread_id!);
    }
  };

  const value = {
    messages,
    isAnswerPending: mutation.isPending,
    handleSubmit,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
