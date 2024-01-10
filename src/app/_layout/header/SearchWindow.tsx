import { FaSearch } from "react-icons/fa";

/**
 * ヘッダーに固定する検索窓
 * @returns
 */
export const SearchWindow = () => (
    <form
      action="/search" 
      className="input input-bordered flex items-center justify-center py-0 pr-1"
    >
      <input
        name="query"
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