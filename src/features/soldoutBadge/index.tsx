type SoldoutBadgeProps = {
  className: string;
  spanClassName: string;
};

/**
 * 商品が売り切れであることを示すバッジ
 */
export const SoldoutBadge = ({
  className,
  spanClassName,
}: SoldoutBadgeProps) => (
  <div
    className={`flex justify-center bg-red-600 [clipPath:polygon(0_0,_100%_0,0_100%)] ${className}`}
  >
    <span className={`-rotate-45 font-bold text-dark-bg-wh ${spanClassName}`}>
      SOLD
    </span>
  </div>
);
