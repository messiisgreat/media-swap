"use client";

import { Input } from "@/components/form/Elements";
import { ChangeEvent, ComponentProps, useState } from "react";
import { z } from "zod";

type CommonProps = {
  /** 手数料率 */
  rate: number;
};

type PriceInputProps = CommonProps &
  Omit<ComponentProps<typeof Input>, "onChange">;

/**
 * 手数料計算付きのinputタグ
 * @param {number} rate - 手数料率
 * @returns input,label,div
 */
export const PriceInput = ({ ...props }: PriceInputProps) => {
  const [handlingCharge, setHandlingCharge] = useState(0);
  const [amountAfterCharge, setAmountAfterCharge] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);
  const valueSchema = z
    .number()
    .refine((val) => 300 <= val && val <= 10000000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    const result = valueSchema.safeParse(amount);
    if (result.success) {
      const handlingCharge = Math.round(amount * props.rate);
      const amountAfterCharge = amount - handlingCharge;
      setHandlingCharge(handlingCharge);
      setAmountAfterCharge(amountAfterCharge);
      setIsOverLimit(false);
    } else {
      setHandlingCharge(0);
      setAmountAfterCharge(0);
      setIsOverLimit(true);
    }
  };
  return (
    <>
      <Input
        type="number"
        placeholder="0"
        min={0}
        inputMode="numeric"
        className="w-full text-right font-bold"
        onChange={handleChange}
        {...props}
      />
      { isOverLimit &&
        <label className="label-text-alt flex justify-between text-error">
          300～10,000,000円の範囲内で入力してください。
        </label>
      }
      <div className="flex justify-between">
        <label>販売手数料</label>
        <div>
          <span className="mr-2">¥</span>
          {handlingCharge}
        </div>
      </div>
      <div className="flex justify-between">
        <label>販売利益</label>
        <div>
          <span className="mr-2">¥</span>
          {amountAfterCharge}
        </div>
      </div>
    </>
  );
};
