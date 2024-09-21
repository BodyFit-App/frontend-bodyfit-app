module.exports = {
  preset: "react-native",
  testPathIgnorePatterns: ["/node_modules/", "/.expo/"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-paper|react-native-vector-icons|react-navigation|react-native-pie-chart)/)",
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/types/**",
    "!**/lib/supabase.ts",
    "!**/lib/constants.ts",
    "!jest.config.js",
    "!theme.ts",
    "!App.tsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/__mocks__/jest.setup.js"],
};
