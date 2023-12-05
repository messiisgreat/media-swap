import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AgeCheckContents } from "@/app/age-check/AgeCheckContents";
import { addAgeCheckedCookie } from "@/app/age-check/actions";

jest.mock("./actions", () => ({
  addAgeCheckedCookie: jest.fn(),
}));

describe("AgeCheckContents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("はいを押した際にCookieに保村されるメソッドが呼ばれること", async () => {
    render(<AgeCheckContents />);
    const yesButton = screen.getByText("はい");

    userEvent.click(yesButton);

    await waitFor(() => {
      expect(addAgeCheckedCookie).toHaveBeenCalled();
    });
  });

  it("いいえを押した際には、Cookieに保存されるメソッドが呼ばれないこと", async () => {
    render(<AgeCheckContents />);
    const noButton = screen.getByText("いいえ");

    userEvent.click(noButton);

    await waitFor(() => {
      expect(addAgeCheckedCookie).not.toHaveBeenCalled();
    });
  });
});
