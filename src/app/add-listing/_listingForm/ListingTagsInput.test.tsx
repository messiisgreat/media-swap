import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ListingTagsInput } from "./ListingTagsInput";

describe("ListingTagsInput", () => {
  describe("タグの追加", () => {
    it("Enterでtagを追加できること", () => {
      render(<ListingTagsInput name="tag" suggestedTags={[]} />);

      const input = screen.getByPlaceholderText("タグ名を入力してください");

      userEvent.type(input, "newTag");
      fireEvent.keyDown(input, { keyCode: 13, target: { value: "newTag" } });

      expect(input).toHaveValue("");
      expect(screen.getByText("newTag")).toBeInTheDocument();
      expect(screen.getByText("Tags")).toBeInTheDocument();
    });
    it("重複して同じ名前のタグを追加できないこと", () => {
      render(<ListingTagsInput name="tag" suggestedTags={[]} />);

      const input = screen.getByPlaceholderText("タグ名を入力してください");

      userEvent.type(input, "newTag");
      fireEvent.keyDown(input, { keyCode: 13, target: { value: "newTag" } });
      fireEvent.keyDown(input, { keyCode: 13, target: { value: "newTag" } });

      expect(input).toHaveValue("");
      expect(screen.getAllByText("newTag").length).toBe(1);
    });
  });
  it("focus時にsuggestedTagsが表示されること", () => {
    const suggestedTags = [
      { id: "1", text: "tag1" },
      { id: "2", text: "tag2" },
    ];
    render(<ListingTagsInput name="tag" suggestedTags={suggestedTags} />);

    const input = screen.getByPlaceholderText("タグ名を入力してください");

    userEvent.click(input);

    expect(screen.getByTestId("test-tag1")).toBeInTheDocument();
    expect(screen.getByTestId("test-tag2")).toBeInTheDocument();
  });
  it("タグの削除ができること", async () => {
    render(<ListingTagsInput name="tag" suggestedTags={[]} />);

    const input = screen.getByPlaceholderText("タグ名を入力してください");

    userEvent.type(input, "newTag");
    fireEvent.keyDown(input, { keyCode: 13, target: { value: "newTag" } });

    const deleteButton = screen.getByTestId("delete");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("newTag")).not.toBeInTheDocument();
      expect(screen.queryByText("Tags")).not.toBeInTheDocument();
    });
  });
});
