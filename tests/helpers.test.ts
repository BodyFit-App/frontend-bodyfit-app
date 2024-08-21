import { getRange } from "../lib/helpers";

describe("Test helpers", () => {
  describe("getRange", () => {
    it.each([
      [1, 10, [0, 9]],
      [2, 10, [10, 19]],
      [3, 5, [10, 14]],
      [0, 10, [0, 9]],
      [-1, 10, [0, 9]],
    ])(
      "should return %p for page %p with %p items per page",
      (page, perPage, expected) => {
        const result = getRange(page, perPage);
        expect(result).toEqual(expected);
      },
    );
  });
});
