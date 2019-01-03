//.babelrc page "es2015" and     "babel-preset-es2015": "^6.24.1", module in package json


// {
//   "presets": [
//     ["env", {
//       "modules": false,
//       "targets": {
//         "browsers": ["last 2 versions", "> 2%"]
//       }
//     }],
//     "stage-3",
//     "es2015"
//   ],
//   "plugins": ["transform-vue-jsx", "transform-runtime"],
//   "env": {
//     "test": {
//       "presets": ["env", "stage-3"],
//       "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
//     }
//   }
//}
//pre-line.  "react-loadable": "^5.3.1",

//76-line
 // "react-measure": "^1.4.5",
 //   //
 ////

 //    "sanitize-html-react": "^1.13.0",



//to update the bundles we need to run below like commands dev,prod, production

// npm run dev 

//try
//forever start --spinSleepTime 10000 src/serverMainEntery.js

//else
// npm run dev

//or run below with out "nmp run"

//node ./src/serverMainEntery.js  //because some times server neet to connect DB sucessfully

//sudo forever list
//forever stop 0