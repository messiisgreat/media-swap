import { twMerge } from "tailwind-merge";

type ToggleSwitchProps = {
  /** ラベル */
  labelText?: string;
} & Omit<React.ComponentProps<"input">, "type">;

/**
 * チェックボックス
 * @param props プロパティ
 */
export const ToggleSwitch = ({
  labelText,
  className = "",
  ...props
}: ToggleSwitchProps) => (
  <div className="flex items-center justify-between">
    <label className="ml-2 text-gray-700">{labelText}</label>
    <input
      type="checkbox"
      className={twMerge("toggle toggle-primary ml-2", className)}
      {...props}
    />
  </div>
);
