/**
 * Calculates the start and end indices for pagination.
 *
 * @param {number} page - The current page number (1-based).
 * @param {number} perPage - The number of items per page.
 * @returns {[number, number]} A tuple containing the start and end indices for the given page.
 *
 * @example
 * // Returns [0, 9] for page 1 with 10 items per page
 * getRange(1, 10);
 *
 * @example
 * // Returns [10, 19] for page 2 with 10 items per page
 * getRange(2, 10);
 */

export const getRange = (page: number, perPage: number): [number, number] => {
  if (page < 1) {
    return [0, perPage - 1];
  }
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;
  return [start, end];
};

/**
 * Converts a given string into a URL-friendly slug.
 *
 * @param {string} title - The input string to slugify.
 * @returns {string} A slugified version of the input string.
 *
 * @example
 * // Returns "my-awesome-title"
 * slugify("My Awesome Title!");
 *
 * @example
 * // Returns "hello-world"
 * slugify("Hello World?");
 */

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\/]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
