import React, { useEffect, useState } from "react";
import BuyCryptoNav from "../components/BuyCryptoNav";
import BuySell from "../components/BuySell";
import Coversions from "../components/Coversions";
import BNBMarket from "../components/BNBMarket";

function BuyCrypto() {
  const [websocket, setWebsocket] = useState(null);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws"
    );
    setWebsocket(ws);

    // Event listener for when the connection is opened
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    // Event listener for incoming messages
    ws.addEventListener("message", (event) => {
      // Parse the received JSON data
      const tradeData = JSON.parse(event.data);

      // Update the component state with the new trade data
      setTrades(tradeData);
    });

    // Event listener for errors
    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Event listener for when the connection is closed
    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      <BuyCryptoNav />
      <BuySell />
      <BNBMarket />
      <Coversions />
    </>
  );
}

export default BuyCrypto;


//api_key for coinmarket : e6685e91-ba89-4ff6-8945-4a1f363dfdc5