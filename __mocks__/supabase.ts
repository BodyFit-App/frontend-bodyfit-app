import { client } from "../lib/supabase";

// Example mock setup
export const supabase = () => {
  jest.mock("../lib/supabase", () => ({
    client: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
    },
  }));
};
