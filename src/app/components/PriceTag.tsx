import { formatPrice } from "@/lib/format";
import { Badge } from "./Badge";

type PriceTagProps = {
  price: number;
  className?: string;
};

export default function PriceTag({ price, className }: PriceTagProps) {
  return <Badge className={className}>{formatPrice(price)}</Badge>;
}
