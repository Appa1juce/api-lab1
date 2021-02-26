"use strict";
//reqiure express module
const express = require("express");

//require router object to be used in this file
const routes = require("./routes");

//reqiure cors module
const cors = require("cors");

//creates a instance of a express server
const app = express();

//Enable cross origin resourse shareing so this api
//can be used from other domains
app.use(cors());

//allow post and put requests to use json bodies
app.use(express.json());

app.use("/", routes);

//define a port
const port = 3000;

//the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
