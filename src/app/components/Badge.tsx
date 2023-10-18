import { ComponentProps } from "react";

const badgeVariants = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  success: "badge-success",
  danger: "badge-danger",
  warning: "badge-warning",
  info: "badge-info",
};

type BadgeProps = ComponentProps<"div"> & {
  variant?: keyof typeof badgeVariants;
  outline?: boolean;
};

export const Badge = ({
  className,
  variant,
  outline,
  ...props
}: BadgeProps) => {
  const badgeClass = `badge p-2 ${outline ? "badge-outline" : ""} ${
    variant ? badgeVariants[variant] : ""
  } ${className}`;
  return <div className={badgeClass} {...props} />;
};
