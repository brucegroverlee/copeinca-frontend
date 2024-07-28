import { createContext, FormEvent, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@lib/api";
import { MessageDto } from "./MessageDto";

const USER_ID = "user_id";
const CHAT_ID = "default";

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
  // const [messages, setMessages] = useState<MessageDto[]>([]);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["messages", CHAT_ID],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("user_id", USER_ID);
      params.append("chat_id", CHAT_ID);

      const { data } = await api.get("/messages", { params });

      return data.messages as MessageDto[];
    },
  });

  const messages = query.data || [];

  const setMessages = (newMessage: MessageDto) => {
    queryClient.setQueryData(
      ["messages", CHAT_ID],
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
      const history = messages.map((message) => ({
        role: message.role,
        content: message.message,
      }));

      const { data } = await api.post("/messages", {
        user_id: USER_ID,
        chat_id: CHAT_ID,
        history,
        user_question: message,
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
      message,
      created_at: new Date().toISOString(),
    });

    const reply = await mutation.mutateAsync(message);

    setMessages(reply);
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
