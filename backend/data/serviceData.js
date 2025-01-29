const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
  const data = await fs.readFile("services.json", "utf-8");
  return JSON.parse(data);
}

async function getServices() {
  const storedData = await readData();
  if (!storedData) {
    throw new NotFoundError("Could not fetch data from services.json.");
  }

  return storedData;
}

exports.getServices = getServices;
