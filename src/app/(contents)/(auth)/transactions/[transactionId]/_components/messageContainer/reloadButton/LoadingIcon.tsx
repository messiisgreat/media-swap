import { FaSyncAlt } from "react-icons/fa";

type Props = {
  isLoading: boolean;
};

/**
 * コメント読込み中のアイコン
 */
export const LoadingIcon = ({ isLoading }: Props) => (
  <div className={`${isLoading ? "animate-[spin_1s_linear_1]" : ""}`}>
    <FaSyncAlt size="1rem" />
  </div>
);
