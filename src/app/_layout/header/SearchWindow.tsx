"use client";

import { useRouter } from "next/navigation";
import { type FormEventHandler, useCallback } from "react";
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
      className="input input-bordered flex w-full items-center justify-center py-0 pr-1"
    >
      <input
        name={formValue}
        placeholder="何をお探しですか？"
        className="h-full"
      />
      <button
        type="submit"
        className="h-full px-2 text-gray-500 hover:text-gray-700"
        aria-label="検索ボタン"
      >
        <FaSearch size={22} />
      </button>
    </form>
  );
};
