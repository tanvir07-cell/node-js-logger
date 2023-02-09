const express = require("express");
const logger = require("./utils/logger");
const { useMorgan } = require("./utils/useMorgan");
const app = express();
const shortid = require("shortid");

// working morgan in useMorgan file:
useMorgan(app);

// for generating shortid middleware for app route(that means all req and reponse use this shortid)
app.use((req, res, next) => {
  const id = shortid.generate();
  req.id = id;
  next();
});

app.get("/", (req, res) => {
  // simple built in logger in node.js(console)
  // logger.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  res.status(200).json({
    message: "Hello node.js logger",
  });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

// logger.log("My name is Tanvir Rifat");
// logger.info("This is the info");
