module.exports = {
 root: true,
 parserOptions: {
   sourceType: 'module',
   parser: "babel-eslint"
 },
 env: {
   browser: true,
 },
 plugins: ["vue", "prettier"],
 extends: ["prettier", "prettier/standard", "plugin:vue/recommended"],
 rules: {
   "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
   "indent": [2, "tab"],
   "no-tabs": 0,
   "vue/require-valid-default-prop": 0,//::::by react refernce
    "vue/require-prop-types":0 //::::by react refernce
 }
}
//::::by react refernce

//https://stackoverflow.com/questions/30948970/how-to-disable-eslint-react-prop-types-rule-in-a-file
// https://stackoverflow.com/questions/53653649/how-to-dissable-avoid-error-vuejs-props-should-at-least-define-their-types/53653650#53653650
//::::by react refernce








// module.exports = {
//   root: true,
//   parserOptions: {
//     sourceType: "module",
//     parser: "babel-eslint"
//   },
//   env: {
//     browser: true
//   },
//   extends: ["prettier", "prettier/standard", "plugin:vue/recommended"],
//   plugins: ["vue", "prettier"],
//   rules: {
//     "prettier/prettier": "error"
//   }
// };