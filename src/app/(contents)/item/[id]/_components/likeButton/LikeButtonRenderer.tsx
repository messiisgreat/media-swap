import { twMerge } from "tailwind-merge";

type Props = {
  /** いいね数 */
  count: number;
  /** いいね済みかどうか */
  isLiked: boolean;
  /** いいねボタンを押したときの処理 */
  onClick: () => void;
  /** いいねボタンを押したときの処理中かどうか */
  loading: boolean;
  /** className */
  className?: string;
};

/**
 * いいねボタン
 * @returns
 */
export function LikeButtonRenderer({
  count,
  isLiked,
  loading,
  onClick: handleClick,
  className = "",
}: Props) {
  const heartClass =
    "peer-checked:[&>g>path]:scale-[0.2] peer-checked:[&>g>path]:[fill:#e2264d] peer-checked:[&>g>path]:animate-heart";
  const maincircClass =
    "peer-checked:[&>g>circle]:[transition:all_2s] peer-checked:[&>g>circle]:animate-heart-circle peer-checked:[&>g>circle]:opacity-100";
  const favgroupClass =
    "peer-checked:[&>g>g]:opacity-100 peer-checked:[&>g>g]:[transition:0.1s_all_0.3s]";
  const favgroup1oval1Class =
    "peer-checked:[&>g>g:nth-of-type(7)>circle:first-child]:[transform:translate(0,-30px)] peer-checked:[&>g>g:nth-of-type(7)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(7)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup1oval2Class =
    "peer-checked:[&>g>g:nth-of-type(7)>circle:last-child]:[transform:translate(10px,-50px)] peer-checked:[&>g>g:nth-of-type(7)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(7)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup2oval1Class =
    "peer-checked:[&>g>g:nth-of-type(4)>circle:first-child]:[transform:translate(30px,-15px)] peer-checked:[&>g>g:nth-of-type(4)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(4)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup2oval2Class =
    "peer-checked:[&>g>g:nth-of-type(4)>circle:last-child]:[transform:translate(60px,-15px)] peer-checked:[&>g>g:nth-of-type(4)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(4)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup3oval1Class =
    "peer-checked:[&>g>g:nth-of-type(3)>circle:first-child]:[transform:translate(30px,0px)] peer-checked:[&>g>g:nth-of-type(3)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(3)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup3oval2Class =
    "peer-checked:[&>g>g:nth-of-type(3)>circle:last-child]:[transform:translate(60px,10px)] peer-checked:[&>g>g:nth-of-type(3)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(3)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup4oval1Class =
    "peer-checked:[&>g>g:nth-of-type(6)>circle:first-child]:[transform:translate(30px,15px)] peer-checked:[&>g>g:nth-of-type(6)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(6)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup4oval2Class =
    "peer-checked:[&>g>g:nth-of-type(6)>circle:last-child]:[transform:translate(40px,50px)] peer-checked:[&>g>g:nth-of-type(6)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(6)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup5oval1Class =
    "peer-checked:[&>g>g:nth-of-type(5)>circle:first-child]:[transform:translate(-10px,20px)] peer-checked:[&>g>g:nth-of-type(5)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(5)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup5oval2Class =
    "peer-checked:[&>g>g:nth-of-type(5)>circle:last-child]:[transform:translate(-60px,30px)] peer-checked:[&>g>g:nth-of-type(5)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(5)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup6oval1Class =
    "peer-checked:[&>g>g:nth-of-type(2)>circle:first-child]:[transform:translate(-30px,0px)] peer-checked:[&>g>g:nth-of-type(2)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(2)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup6oval2Class =
    "peer-checked:[&>g>g:nth-of-type(2)>circle:last-child]:[transform:translate(-60px,-5px)] peer-checked:[&>g>g:nth-of-type(2)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(2)>circle:last-child]:[transition:1.5s_transform_0.3s]";
  const favgroup7oval1Class =
    "peer-checked:[&>g>g:nth-of-type(1)>circle:first-child]:[transform:translate(-30px,-15px)] peer-checked:[&>g>g:nth-of-type(1)>circle:first-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(1)>circle:first-child]:[transition:0.5s_transform_0.3s]";
  const favgroup7oval2Class =
    "peer-checked:[&>g>g:nth-of-type(1)>circle:last-child]:[transform:translate(-55px,-30px)] peer-checked:[&>g>g:nth-of-type(1)>circle:last-child]:origin-[0_0] peer-checked:[&>g>g:nth-of-type(1)>circle:last-child]:[transition:1.5s_transform_0.3s]";

  const svgClass = twMerge(
    heartClass,
    maincircClass,
    favgroupClass,
    favgroup1oval1Class,
    favgroup1oval2Class,
    favgroup2oval1Class,
    favgroup2oval2Class,
    favgroup3oval1Class,
    favgroup3oval2Class,
    favgroup4oval1Class,
    favgroup4oval2Class,
    favgroup5oval1Class,
    favgroup5oval2Class,
    favgroup6oval1Class,
    favgroup6oval2Class,
    favgroup7oval1Class,
    favgroup7oval2Class,
  );
  return (
    <div className={twMerge("flex flex-col items-center", className)}>
      <label
        className={twMerge(
          "w-12 cursor-pointer overflow-visible",
          loading ? "opacity-30" : "",
        )}
        onClick={handleClick}
      >
        <input
          type="checkbox"
          className="peer hidden"
          checked={isLiked}
          readOnly
          disabled={loading}
        />
        <svg
          viewBox="467 392 58 57"
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
        >
          <g fill="none" fillRule="evenodd" transform="translate(467 392)">
            <path
              d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
              className="origin-center animate-heart-out"
              fill="#AAB8C2"
            />
            <circle
              className="origin-[29.5px_29.5px]"
              fill="#E2264D"
              opacity="0"
              cx="29.5"
              cy="29.5"
              r="1.5"
            />
            {/* group7 */}
            <g opacity="0" transform="translate(7 6)">
              <circle fill="#9CD8C3" cx="2" cy="6" r="2" />
              <circle fill="#8CE8C3" cx="5" cy="2" r="2" />
            </g>
            {/* group6 */}
            <g opacity="0" transform="translate(0 28)">
              <circle fill="#CC8EF5" cx="2" cy="7" r="2" />
              <circle fill="#91D2FA" cx="3" cy="2" r="2" />
            </g>
            {/* group3 */}
            <g opacity="0" transform="translate(52 28)">
              <circle fill="#9CD8C3" cx="2" cy="7" r="2" />
              <circle fill="#8CE8C3" cx="4" cy="2" r="2" />
            </g>
            {/* group2 */}
            <g opacity="0" transform="translate(44 6)">
              <circle fill="#CC8EF5" cx="5" cy="6" r="2" />
              <circle fill="#CC8EF5" cx="2" cy="2" r="2" />
            </g>
            {/* group5 */}
            <g opacity="0" transform="translate(14 50)">
              <circle fill="#91D2FA" cx="6" cy="5" r="2" />
              <circle fill="#91D2FA" cx="2" cy="2" r="2" />
            </g>
            {/* group4 */}
            <g opacity="0" transform="translate(40 50)">
              <circle fill="#F48EA7" cx="6" cy="5" r="2" />
              <circle fill="#F48EA7" cx="2" cy="2" r="2" />
            </g>
            {/* group1 */}
            <g opacity="0" transform="translate(24)">
              <circle fill="#9FC7FA" cx="2.5" cy="3" r="2" />
              <circle fill="#9FC7FA" cx="7.5" cy="2" r="2" />
            </g>
          </g>
        </svg>
      </label>
      <span>{count}</span>
    </div>
  );
}
