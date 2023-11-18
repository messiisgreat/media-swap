/**
 *SoldoutBadge: 商品がsoldした際につけるBadge
 */
const SoldOutBadge = () => {
  return (
    <div className="flex h-[50px] w-[50px] justify-center bg-[red] [clipPath:polygon(0_0,_100%_0,0_100%)]">
      <span className="-rotate-45  p-2 text-xs font-bold text-white">SOLD</span>
    </div>
  );
};

export default SoldOutBadge;
