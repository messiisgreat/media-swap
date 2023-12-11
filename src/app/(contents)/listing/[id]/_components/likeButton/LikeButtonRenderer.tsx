/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import "@/app/(contents)/listing/[id]/_components/likeButton/likeButton.css";

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
  return (
    <div className={className}>
      <input
        type="checkbox"
        id="favbox"
        className="hidden"
        checked={isLiked}
        readOnly
      />
      <div className="flex flex-col items-center">
        <label
          className={`${
            loading ? "opacity-30" : ""
          } transition-opacity duration-300 ease-in-out`}
          onClick={handleClick}
        >
          <svg
            viewBox="467 392 58 57"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 cursor-pointer overflow-visible"
          >
            <g fill="none" fillRule="evenodd" transform="translate(467 392)">
              <path
                d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                className="origin-center animate-heart-out"
                fill="#AAB8C2"
                id="heart"
              />
              <circle
                className="origin-[29.5px_29.5px]"
                fill="#E2264D"
                opacity="0"
                cx="29.5"
                cy="29.5"
                r="1.5"
                id="main-circ"
              />

              <g id="favgroup7" opacity="0" transform="translate(7 6)">
                <circle className="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                <circle className="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
              </g>

              <g id="favgroup6" opacity="0" transform="translate(0 28)">
                <circle className="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                <circle className="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
              </g>

              <g id="favgroup3" opacity="0" transform="translate(52 28)">
                <circle className="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                <circle className="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
              </g>

              <g id="favgroup2" opacity="0" transform="translate(44 6)">
                <circle className="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                <circle className="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
              </g>

              <g id="favgroup5" opacity="0" transform="translate(14 50)">
                <circle className="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                <circle className="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
              </g>

              <g id="favgroup4" opacity="0" transform="translate(35 50)">
                <circle className="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                <circle className="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
              </g>

              <g id="favgroup1" opacity="0" transform="translate(24)">
                <circle
                  className="oval1"
                  fill="#9FC7FA"
                  cx="2.5"
                  cy="3"
                  r="2"
                />
                <circle
                  className="oval2"
                  fill="#9FC7FA"
                  cx="7.5"
                  cy="2"
                  r="2"
                />
              </g>
            </g>
          </svg>
        </label>
        <span>{count}</span>
      </div>
    </div>
  );
}
