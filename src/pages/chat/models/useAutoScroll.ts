import { useCallback, useEffect, useRef, useState } from "react";

import { MessageDto } from "./MessageDto";

type Props = {
  messages: MessageDto[];
  threshold?: number;
};

export function useAutoScroll({ messages, threshold = 100 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = useCallback(
    (behavior?: ScrollBehavior) => {
      if (!messages) {
        return;
      }

      if (!containerRef.current) {
        return;
      }

      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: behavior || "smooth",
      });
    },
    [messages]
  );

  useEffect(
    () => {
      if (isAtBottom) {
        scrollToBottom("instant");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages]
  );

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const isUserAtBottom = scrollHeight - scrollTop <= clientHeight + threshold;

    setIsAtBottom(isUserAtBottom);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return {
    containerRef,
    isAtBottom,
    scrollToBottom,
  };
}
