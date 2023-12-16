import {
  forwardRef,
  memo,
  type ComponentProps,
  type ForwardedRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div">;

/**
 * 汎用カードコンポーネント
 */
export const Card = memo(
  forwardRef<HTMLDivElement, Props>(function Card(
    { children, className = "", ...props }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <div
        ref={ref}
        className={twMerge(
          "card bg-base-100 rounded-lg p-4 shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }),
);
