import { ReactNode } from "react";

export interface MessageDto {
  role: "user" | "assistant";
  message: string | ReactNode;
  created_at?: string;
}
