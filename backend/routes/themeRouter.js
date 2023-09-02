const express = require("express");
const { areaSearch } = require("../controllers/areaController");
const { listTheme } = require("../controllers/themeController");

const app = express();
const search = express.Router();

search.get("/:keyword", listTheme, areaSearch);

module.exports = search;
