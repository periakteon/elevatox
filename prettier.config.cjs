/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
};

module.exports = config;
