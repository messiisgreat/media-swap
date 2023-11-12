import { redirect } from "next/navigation";
import { FaSearch } from "react-icons/fa";

async function searchListings(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect(`/search?query=${encodeURIComponent(searchQuery)}`);
  }
}

/**
 * ヘッダーに固定する検索窓
 * @returns
 */
export const SearchWindow = () => {
  return (
    <form
      action={searchListings}
      className="input input-bordered flex w-full items-center justify-center py-0 pr-1"
    >
      <input
        name="searchQuery"
        placeholder="何をお探しですか？"
        className="h-full"
      />
      <button type="submit" className="h-full px-2" aria-label="検索ボタン">
        <FaSearch size={22} />
      </button>
    </form>
  );
};
