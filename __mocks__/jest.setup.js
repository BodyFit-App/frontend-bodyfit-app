// Mock pour Supabase
jest.mock("@supabase/supabase-js", () => {
  let testData = null;
  let testError = null;

  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        auth: {
          signInWithPassword: jest.fn(),
          getSession: jest.fn(),
          onAuthStateChange: jest.fn(),
          signOut: jest.fn(),
        },
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
          ilike: jest.fn().mockReturnThis(),
          contains: jest.fn().mockReturnThis(),
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
          single: jest.fn().mockReturnThis(),
          data: testData,
          error: testError,
        })),
        update: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockReturnThis(),
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

// Mock pour React Native Animated
// jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock pour AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve([])),
  multiRemove: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
}));

// Mock pour react-native-vector-icons
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

// Mock pour Alert
const Alert = require("react-native").Alert;
Alert.alert = jest.fn();

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ uri: "mock-uri" }],
  }),
  MediaTypeOptions: {
    Images: "Images",
  },
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

jest.mock("expo-file-system", () => ({
  readAsStringAsync: jest.fn().mockResolvedValue("base64-string"),
}));

jest.mock("expo-image-manipulator", () => ({
  manipulateAsync: jest.fn().mockResolvedValue({ uri: "resized-uri" }),
  SaveFormat: {
    JPEG: "JPEG",
    PNG: "PNG",
  },
}));

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
