jest.mock("@supabase/supabase-js", () => {
  let testData = null;
  let testError = null;

  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          single: jest.fn().mockReturnThis(),
          range: jest.fn().mockReturnThis(),
          data: testData,
          error: testError,
        })),
        insert: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          data: testData,
          error: testError,
        })),
        upsert: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          data: testData,
          error: testError,
        })),
        delete: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          data: testData,
          error: testError,
        })),
      };
    }),
    setTestData: (newData) => {
      testData = newData;
    },
    setTestError: (newError) => {
      testError = newError;
    },
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
}));
