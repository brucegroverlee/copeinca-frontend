import { ReactNode } from "react";

export interface MessageDto {
  role: "user" | "assistant";
  content: string | ReactNode;
  thread_id?: string;
  created_at?: string;
}
