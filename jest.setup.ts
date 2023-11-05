import "@testing-library/jest-dom/extend-expect";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => {
        return;
      },
    };
  },
}));
