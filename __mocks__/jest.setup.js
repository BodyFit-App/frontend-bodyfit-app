import mockClient from "./mockClient";

jest.mock("../lib/supabase", () => {
  return { client: mockClient };
});
