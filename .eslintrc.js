module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'func-call-spacing': process.env.NODE_ENV !== 'production' ? 'warn' : 'warn',
    'no-case-declarations': 'off'
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
