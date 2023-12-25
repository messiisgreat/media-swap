import Link from "next/link";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

/**
 * ページネーションバー
 * @param param0.currentPage 現在のページ
 * @param param0.totalPages 総ページ数
 * @returns ページネーションバー
 */
export const PaginationBar = ({ currentPage, totalPages }: PaginationBarProps) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems = Array.from(
    { length: maxPage - minPage + 1 },
    (_, i) => minPage + i,
  ).map((page) => (
    <Link
      href={`?page=${page}`}
      key={page}
      className={`btn join-item ${
        currentPage === page ? "btn-active pointer-events-none" : ""
      }`}
    >
      {page}
    </Link>
  ));

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            «
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            »
          </Link>
        )}
      </div>
    </>
  );
};
