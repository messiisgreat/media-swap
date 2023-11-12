"use client";

import { TransactionComment } from "@prisma/client";
import { useEffect, useState } from "react";

/**
 * 取引画面のメッセージ
 * @returns
 */
export function MessageSection() {
  const [messages, setMessages] = useState<TransactionComment[]>([]);
  useEffect(() => {
    getMessages()
  }, []);
  return (
    <div>

    </div>
  );
}
