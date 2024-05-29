const axios = require("axios");

const CoinMarket = async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "e6685e91-ba89-4ff6-8945-4a1f363dfdc5",
        },
      }
    );
    const json = response.data;
    console.log("data", json);
    res.json(json);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { CoinMarket };
