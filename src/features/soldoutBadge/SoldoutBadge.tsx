/**
 * 商品が売り切れであることを示すバッジ
 */
export const SoldoutBadge = ({
  className,
  spanClassName,
}: {
  className: string; //height, width 指定必須
  spanClassName: string; //font-size, padding 指定必須
}) => (
  <div
    className={`flex justify-center bg-red-600 [clipPath:polygon(0_0,_100%_0,0_100%)] ${className}`}
  >
    <span className={`-rotate-45 font-bold text-dark-bg-wh ${spanClassName}`}>
      SOLD
    </span>
  </div>
);
