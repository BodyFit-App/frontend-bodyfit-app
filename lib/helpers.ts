export const getRange = (page: number, perPage: number): [number, number] => {
  if (page < 1) {
    return [0, perPage - 1];
  }
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;
  return [start, end];
};

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
