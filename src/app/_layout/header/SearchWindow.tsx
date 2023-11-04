import { redirect } from "next/navigation";

async function searchListings(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

/**
 * ヘッダーに固定する検索窓
 * @returns
 */
export const SearchWindow = () => {
  return (
    <form action={searchListings}>
      <div className="form-control">
        <input
          name="searchQuery"
          placeholder="何をお探しですか？"
          className="input input-bordered w-full min-w-[100px]"
        />
      </div>
    </form>
  );
};
