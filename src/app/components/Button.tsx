import { ComponentProps, memo } from "react";

type Props = ComponentProps<"button"> & {
  outline?: boolean;
  secondary?: boolean;
};

export const Button = memo(function Button({
  outline = false,
  secondary = false,
  children,
  className,
  type = "button",
  ...props
}: Props) {
  const variant = `${outline ? "btn-outline" : ""} ${
    secondary ? "btn-secondary" : "btn-primary"
  }`;
  return (
    <button className={`btn ${variant} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
});
