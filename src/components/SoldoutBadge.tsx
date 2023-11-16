/**
 *SoldoutBadge: 商品がsoldした際につけるBadge
 */
const SoldoutBadge = () => {
  return (
    <div
      className="flex h-[100px] w-[100px] justify-center bg-[red]
  [clipPath:polygon(0_0,_100%_0,0_100%)]"
    >
      <span className="-rotate-45 font-bold text-white">SOLD</span>
    </div>
  );
};

export default SoldoutBadge;
