import { fetchCategories } from "./categories";
import { client } from "../lib/supabase";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("fetchCategories", () => {
  it("should return data when client call succeeds", async () => {
    const mockData = [{ id: 1, name: "Category 1" }, {
      id: 2,
      name: "Category 2",
    }];
    setTestData(mockData);

    const result = await fetchCategories();

    expect(client.from).toHaveBeenCalledWith("categories");
    expect(client.from().select).toHaveBeenCalledWith("id, name");
    expect(result).toEqual(mockData);
  });

  it("should throw an error when client call fails", async () => {
    const errorMessage = "Failed to fetch categories";
    setTestError({ message: errorMessage });

    await expect(fetchCategories()).rejects.toThrow(errorMessage);

    expect(client.from).toHaveBeenCalledWith("categories");
    expect(client.from().select).toHaveBeenCalledWith("id, name");
  });
});
