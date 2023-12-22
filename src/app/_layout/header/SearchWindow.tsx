"use client";

import { useRouter } from "next/navigation";
import { useCallback, type FormEventHandler } from "react";
import { FaSearch } from "react-icons/fa";

const formValue = "query";

/**
 * ヘッダーに固定する検索窓
 * @returns
 */
export const SearchWindow = () => {
  const router = useRouter();

  const handleSearch: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const searchQuery = formData.get(formValue)?.toString();
      if (searchQuery) {
        router.push(`/search?query=${searchQuery}`);
      }
    },
    [router],
  );
  return (
    <form
      onSubmit={handleSearch}
      className="input input-bordered flex items-center justify-center py-0 pr-1"
    >
      <input
        name={formValue}
        placeholder="何をお探しですか？"
        className="m-auto w-full"
        type="search"
        aria-label="検索窓"
        maxLength={64}
      />
      <button
        type="submit"
        className="h-full pr-2 text-gray-500 hover:text-gray-700"
        aria-label="検索ボタン"
      >
        <FaSearch size={22} />
      </button>
    </form>
  );
};
