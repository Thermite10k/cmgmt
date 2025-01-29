const express = require("express");

const { getServices } = require("../data/serviceData");
const { isValidText } = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const serviceData = await getServices();
    setTimeout(() => {
      res.json(serviceData);
    }, 2000);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
