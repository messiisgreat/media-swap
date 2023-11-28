"use client";

import { Input } from "@/components/form/Elements";
import { ChangeEvent, ComponentProps, useState } from "react";
import { z } from "zod";
import { HANDING_CHARGE_RATE } from "@/constants/listing";

type PriceInputProps = Omit<ComponentProps<typeof Input>, "onChange">;

/**
 * 手数料計算付きのinputタグ
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
    if (e.target.value) e.target.value = String(amount);
    const result = valueSchema.safeParse(amount);
    if (result.success) {
      const handingCharge = Math.round(amount * HANDING_CHARGE_RATE);
      const amountAfterCharge = amount - handingCharge;
      setHandlingCharge(handingCharge);
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
        className="w-full text-right font-bold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
