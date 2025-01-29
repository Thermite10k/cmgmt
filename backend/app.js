const bodyParser = require("body-parser");
const express = require("express");

const servicesRoute = require("./routes/services");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader("Access-control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-control-Allow-Headers", "Content-Type");
  next();
});

app.use("/services", servicesRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080);
