import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { ItemTagsInput } from "@/features/itemsFormContents/detailsContents/ItemTagsInput";

describe("ItemTagsInput", () => {
  describe("タグの追加", () => {
    test("Enterでタグを追加できること", async () => {
      render(<ItemTagsInput name="tag" suggestedTags={[]} />);
      const input = screen.getByPlaceholderText("タグ名を入力してください");
      await userEvent.type(input, "newTag");

      fireEvent.keyDown(input, { keyCode: 13, target: input });

      expect(screen.getByText("Tags")).toBeInTheDocument();
      expect(screen.getByText("newTag")).toBeInTheDocument();
    });

    test("タグ追加後、タグの入力欄は空になる", async () => {
      render(<ItemTagsInput name="tag" suggestedTags={[]} />);
      const input = screen.getByPlaceholderText("タグ名を入力してください");
      await userEvent.type(input, "newTag");

      fireEvent.keyDown(input, { keyCode: 13, target: input });

      expect(input).toHaveValue("");
    });

    test("重複して同じ名前のタグを追加できないこと", async () => {
      render(<ItemTagsInput name="tag" suggestedTags={[]} />);
      const input = screen.getByPlaceholderText("タグ名を入力してください");
      await userEvent.type(input, "newTag");
      fireEvent.keyDown(input, { keyCode: 13, target: input });

      fireEvent.keyDown(input, { keyCode: 13, target: input });

      expect(screen.getAllByText("newTag")).toHaveLength(1);
    });
  });

  test("focus時にsuggestedTagsが表示されること", async () => {
    const suggestedTags = [
      { id: "1", text: "tag1", createdAt: new Date() },
      { id: "2", text: "tag2", createdAt: new Date() },
    ];
    render(<ItemTagsInput name="tag" suggestedTags={suggestedTags} />);
    const input = screen.getByPlaceholderText("タグ名を入力してください");

    await userEvent.click(input);

    expect(screen.getByTestId("test-tag1")).toBeInTheDocument();
    expect(screen.getByTestId("test-tag2")).toBeInTheDocument();
  });

  test("タグの削除ができること", async () => {
    render(<ItemTagsInput name="tag" suggestedTags={[]} />);
    const input = screen.getByPlaceholderText("タグ名を入力してください");
    await userEvent.type(input, "newTag");
    fireEvent.keyDown(input, { keyCode: 13, target: input });
    const deleteButton = screen.getByTestId("delete");

    await userEvent.click(deleteButton);

    expect(screen.queryByText("newTag")).not.toBeInTheDocument();
    expect(screen.queryByText("Tags")).not.toBeInTheDocument();
  });
});
