const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// enable cors & security
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(helmet());
app.use(hpp());
app.use(limiter);
app.use(cors());

// routes modules
const authRoute = require('./app/routes/auth_router');
const userRoute = require('./app/routes/user_router');

app.use('/', authRoute);
app.use('/movie_reviews/user', userRoute);


// server initial
const PORT = process.env.PORT || 1337;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// handled promise error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1)); // close server and exit
});

module.exports = app;
