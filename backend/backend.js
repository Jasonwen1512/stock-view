const express = require("express");
const cors = require("cors");
const axios = require("axios");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
const PORT = process.env.PORT || 3000;

// 啟用 CORS
app.use(cors());

// 搜尋大盤即時數據（美股）
app.get("/api/Ostock/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await yahooFinance.quote(symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "股票數據查詢失敗" });
  }
});

app.get("/stock/^TWII", async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await yahooFinance.quote(symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "股票數據查詢失敗" });
  }
});
// 台股大盤加權指數
app.get("/api/TWstock", async (req, res) => {
  const twseApiUrl = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_t00.tw|otc_o00.tw`;
  try {
    const response = await axios.get(twseApiUrl);
    if (
      response.data &&
      response.data.msgArray &&
      response.data.msgArray.length > 0
    ) {
      const StockInfo = response.data.msgArray;
      // 回傳值
      res.json({
        success: true,
        data: StockInfo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Stock data not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching stock data",
    });
  }
});

//查詢台股個股
app.get("/api/TWstock/:stockCode", async (req, res) => {
  const { stockCode } = req.params;
  const twseApiUrl = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=${stockCode}`;
  try {
    const response = await axios.get(twseApiUrl);
    if (
      response.data &&
      response.data.msgArray &&
      response.data.msgArray.length > 0
    ) {
      const StockInfo = response.data.msgArray;
      // 回傳值
      res.json({
        success: true,
        data: StockInfo,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Stock data not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching stock data",
    });
  }
});

// 取得股票代碼（資料更新於2025/1/4）
app.get("/api/stockData", async (req, res) => {
  try {
    const stockDataJson = require("./stockData.json");
    res.json(stockDataJson);
  } catch (error) {
    console.log(error);
  }
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器正在執行於 http://localhost:${PORT}`);
});
