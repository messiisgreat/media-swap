import { Input, Textarea } from "@/ui/form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  test("デフォルトでmaxLengthは256に設定されていること", async () => {
    render(<Input />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    const inputValue = "a".repeat(257);

    await userEvent.type(input, inputValue);

    expect(input.value).toHaveLength(256);
  });
});

describe("Textarea", () => {
  test("デフォルトでmaxLengthは4096に設定されていること", async () => {
    render(<Textarea />);
    const input = screen.getByRole<HTMLTextAreaElement>("textbox");
    const inputValue = "a".repeat(4097);

    await userEvent.type(input, inputValue);

    expect(input.value).toHaveLength(4096);
  }, 10000);
});
