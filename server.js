//express server
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const { clientConfig } = require('config');
require('./src/loadConfig');

const DB = require('./src/server/Models/OrdersModel');
const DB2 = require('./src/server/Models/NotesModel');
const DB3 = require('./src/server/Models/UserModel');
const DB4 = require('./src/server/Models/CmsModel');
const DB5 = require('./src/server/Models/OffersModel');
const DB6 = require('./src/server/Models/TestModel');


//const DB6 = require('./src/server/Models/SiteTickerModel');

//import {cms, OfferSchema } from './src/server/Models/CmsModel';

import './src/loadConfig';
const auth = require('./src/server/Controllers/Auth');
const notes = require('./src/server/Controllers/Notes/Notes');
const middlewares = require('./src/server/Controllers/Auth/middlewares');



//obtain bundle
const bundle = require("./dist/server.bundle.js");

const routes = require('./src/server/routes');

const storeReq = require('./src/client/App')




//mongoose instance connection url connection
mongoose.Promise = global.Promise;
//connect directly to mongoose

mongoose.connect('mongodb://localhost/homeolaya').then(
    (res) => {
        console.log("Successfully connected to the database.")
    }
    ).catch(() => {
    console.log("Conntection to database failed.");
});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
  next();
});


//app.use(bodyParser.json());


//If extended is false, you can not post "nested object"
//If extended is true, you can do whatever way that you like.

app.use(bodyParser.urlencoded({ extended: false }));
// parse incoming requests
app.use(bodyParser.json());


app.use(express.json());
app.use(middlewares.checkTokenSetUser);



//get renderer from vue server renderer
const renderer = require("vue-server-renderer").createRenderer({
  //set template
  template: fs.readFileSync("./index.html", "utf-8")
});
console.log("Server starting ...");

const port = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/public", express.static(path.join(__dirname, "./public")));


app.use('/auth', auth);
//app.use('/notes', middlewares.isLoggedIn, notes);





routes(app)

//start server
app.get("*", (req, res, next) => {

  
  bundle.default({ url: req.url }).then(
    app => {
      //context to use as data source
      //in the template for interpolation
      const context = {
        title: "Homeolaya",
        meta: `
                <meta description="vuejs server side render">
            `,
        cool: `<link rel="shortcut icon" href="/public/DS7.png" sizes="16x16" type="image/png">`,
        clientConfig: 'clientConfig'
      };

      renderer.renderToString (app, context, function(err, html) {
       
           
        if (err) {
          if (err.code === 404) {
            res.status(404).end("Page not found");
          } else {
            res.status(500).end("Internal Server Error");
          }
        } else {
          res.end(html);
          storeReq.getReq(req)
        }
      });
    },
    err => {
      console.log(err);
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}!`));

// server.listen((port,)=>{
//     console.log(`server running on ${process.env.PORT || 8080}`)
// });
