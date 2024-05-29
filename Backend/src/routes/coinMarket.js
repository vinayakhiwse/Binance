const express = require("express");
const { CoinMarket } = require("../controller/coinMarketController");
const router = express.Router();

router.get("/crypto", CoinMarket);

module.exports = router;
