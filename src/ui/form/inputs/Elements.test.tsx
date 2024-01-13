import { Input, Textarea } from "@/ui/form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  test("指定したmaxLength以上の文字数は入力できないこと", async () => {
    const maxLength = 5;
    render(<Input {...{ maxLength }} />);
    const input = screen.getByRole<HTMLInputElement>("textbox");
    const value = "a".repeat(maxLength + 1);
    await userEvent.type(input, value);
    expect(input.value).toHaveLength(maxLength);
  });
});

describe("Textarea", () => {
  test("指定したmaxLength以上の文字数は入力できないこと", async () => {
    const maxLength = 5;
    render(<Textarea {...{ maxLength }} />);
    const input = screen.getByRole<HTMLTextAreaElement>("textbox");
    const value = "a".repeat(maxLength + 1);
    await userEvent.type(input, value);
    expect(input.value).toHaveLength(maxLength);
  });
});
