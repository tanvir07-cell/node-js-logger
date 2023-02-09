const morgan = require("morgan");
const shortid = require("shortid");
const morganJson = require("morgan-json");
const express = require("express");
const app = express();

// for build in morgan token and format:
// app.use(morgan("dev"));

// for custom morgan token generate the random number:
morgan.token("random", (req, res) => {
  return Math.round(Math.random() * 100);
});
// for custom morgan token generate the shortid:
morgan.token("request-id", (req, res) => {
  return req.id;
});

// app.use(
//   morgan(":url | :status | :method | Random Number : :random | id:request-id")
// );

// for json and more readable morgan output:
app.use(
  morgan(
    morganJson({
      Method: ":method",
      URL: ":url",
      "random-number": ":random",
      id: ":request-id",
    })
  )
);

module.exports.useMorgan = (app) => {
  if (process.env.NODE_ENV === "production") {
    // update latter because we are in development:
  } else {
    app.use(
      morgan("dev", {
        skip: (req, res) => {
          return res.statusCode < 400;
          //   that means 400(error code) bade sob valo ba good code gula skip korbo:
        },
        stream: process.stderr,
      })
    );

    app.use(
      morgan("dev", {
        skip: (req, res) => {
          return res.statusCode >= 400;
          //   error status code gulake skip korbo
        },
        stream: process.stdout,
      })
    );
  }
};
