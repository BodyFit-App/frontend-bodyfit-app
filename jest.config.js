module.exports = {
  preset: "react-native",
  testPathIgnorePatterns: ["/node_modules/", "/.expo/"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation)/)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/types/**",
    "!**/lib/supabase.ts",
    "!jest.config.js",
  ],
};
