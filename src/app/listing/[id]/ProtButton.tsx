'use client'
import React, { useCallback } from 'react'
import { Listing } from "@prisma/client";
import { protTransactionStateUpdate } from "@/app/listing/[id]/protAction";
/**
 * プロトタイプのボタンコンポーネントです。
 * 
 * @param children ボタン内のコンテンツ
 * @returns クリックイベントを処理するボタンコンポーネント
 */
export const ProtButton = ({ children, data }: { children: React.ReactNode, data: Listing }) => {
  const handleClick = useCallback(async () => {
    await protTransactionStateUpdate(
      data.transactionId as string,
      1
    )
  }, [data.transactionId])

  return (
    <button className="btn btn-primary" onClick={handleClick} >
      {children}
    </button>
  );
}
