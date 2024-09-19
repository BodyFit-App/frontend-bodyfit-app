import { getRange, slugify } from "./helpers";

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

describe("slugify", () => {
  it("should convert a title to a slug", () => {
    expect(slugify("Hello World! This is a test / title.")).toBe(
      "hello-world-this-is-a-test-title",
    );
  });

  it("should handle multiple spaces and slashes", () => {
    expect(slugify("   Multiple   spaces / and slashes /   ")).toBe(
      "multiple-spaces-and-slashes",
    );
  });

  it("should handle special characters", () => {
    expect(slugify("Special @#$% characters!")).toBe("special-characters");
  });

  it("should handle empty strings", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle strings with only special characters", () => {
    expect(slugify("!@#$%^&*()")).toBe("");
  });
});
