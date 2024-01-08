"use client";

import { LoadingIcon } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageContainer/reloadButton/LoadingIcon";
import { reload } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageContainer/reloadButton/actions";
import { Button } from "@/ui";
import { useCallback, useState } from "react";

/**
 * コメント読込みボタン
 */
export const ReloadButton = ({ transactionId }: { transactionId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = useCallback(() => {
    reload(transactionId);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [transactionId]);

  return (
    <Button
      outline
      className="btn-info"
      onClick={handleReload}
      aria-label="コメント読込み"
    >
      <LoadingIcon isLoading={isLoading} />
    </Button>
  );
};
