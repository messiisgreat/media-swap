export {};

declare global {
  // eslint-disable-next-line no-restricted-syntax
  interface Boolean {
    toString(): "true" | "false";
  }
}
