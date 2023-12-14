import {
  useCallback,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";

import { z } from "zod";

import { HANDING_CHARGE_RATE, PRICE_LIMIT } from "@/constants/item";
import { Input } from "@/ui/form/Elements";

const valueSchema = z
  .number()
  .refine((val) => PRICE_LIMIT.MIN <= val && val <= PRICE_LIMIT.MAX);

type PriceInputProps = Omit<ComponentProps<typeof Input>, "onChange">;

/**
 * 手数料計算付きのinputタグ
 * @returns input,label,div
 */
export const PriceInput = ({ ...props }: PriceInputProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const isOutOfRange =
    amount !== "" && (amount > PRICE_LIMIT.MAX || amount < PRICE_LIMIT.MIN);
  const handlingCharge =
    amount === "" ? "" : Math.round(amount * HANDING_CHARGE_RATE);
  const amountAfterCharge =
    handlingCharge === "" || amount === "" ? "" : amount - handlingCharge;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      const numberCurrentTarget = Number(e.currentTarget.value);
      e.currentTarget.value = String(numberCurrentTarget);
      const validated = valueSchema.safeParse(numberCurrentTarget);
      if (validated.success) {
        setAmount(validated.data);
      } else {
        setAmount(0);
      }
    } else {
      setAmount("");
    }
  }, []);

  return (
    <>
      <Input
        type="number"
        placeholder="0"
        min={PRICE_LIMIT.MIN}
        max={PRICE_LIMIT.MAX}
        inputMode="numeric"
        className="w-full text-right font-bold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        onChange={handleChange}
        {...props}
      />
      <label className="label-text-alt flex justify-between text-error">
        {isOutOfRange
          ? `¥${new Intl.NumberFormat().format(
              PRICE_LIMIT.MIN,
            )}以上¥${new Intl.NumberFormat().format(
              PRICE_LIMIT.MAX,
            )}以下で入力してください`
          : "　"}
      </label>
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
