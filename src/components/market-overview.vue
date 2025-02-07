<!-- 市場概況（左側區塊） -->
<template>
  <div>
    <div class="market-overview pt-0">
      <div class="main-market">
        <div class="input-group" v-if="flagPhone">
          <!-- 搜尋框 -->
          <input
            type="text"
            class="form-control"
            placeholder="輸入股票代碼或名稱（上市櫃）"
            aria-label="輸入股票代碼"
            v-model="search"
            @keyup.enter="submit()"
          />
          <!-- 搜尋按鈕 -->
          <span class="input-group-text input-button" @click="submit()">
            <svg
              fill="#b0b3b8"
              height="16px"
              width="16px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 488.4 488.4"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                    S381.9,104.65,381.9,203.25z"
                  />
                </g>
              </g>
            </svg>
          </span>
        </div>

        <div class="m-2">
          <div class="title h2">加權指數</div>
          <div
            class="row"
            :class="{
              up: TWII.z > TWII.y,
              down: TWII.z < TWII.y,
              unchange: TWII.z === TWII.y,
            }"
          >
            <div class="h1 col text-end">{{ TWII.z }}</div>
            <div class="col text-start align-self-center h6">
              <span v-show="TWII.z > TWII.y">▲</span>
              <span v-show="TWII.z < TWII.y">▼</span>
              {{ TWII.change }}
              {{ "(" + TWII.percent + "%)" }}
            </div>
          </div>
          <div class="row h5">
            <div class="col-6">
              <span class="unchange">最高 </span>
              <span
                :class="{
                  up: TWII.h > TWII.y,
                  down: TWII.h < TWII.y,
                  unchange: TWII.h === TWII.y,
                }"
                >{{ TWII.h }}</span
              >
            </div>
            <div class="col-6">
              <span class="unchange">最低 </span>
              <span
                :class="{
                  up: TWII.l > TWII.y,
                  down: TWII.l < TWII.y,
                  unchange: TWII.l === TWII.y,
                }"
                >{{ TWII.l }}</span
              >
            </div>

            <div class="col-6">
              <span class="unchange">開盤 </span>
              <span
                class="o"
                :class="{
                  up: TWII.l > TWII.y,
                  down: TWII.l < TWII.y,
                  unchange: TWII.l === TWII.y,
                }"
                >{{ TWII.o }}</span
              >
            </div>
            <div class="col-6">
              <span class="unchange">成交量 </span>
              <span class="v">{{ TWII.v / 100 + "億" }}</span>
            </div>
          </div>
          <div class="row time mt-2 mx-2">
            <div
              class="col trading"
              :class="{
                tradingClosed: delayStatus === '收盤',
                tradingOpen: delayStatus === '交易中',
                tradingTest: delayStatus === '試戳',
              }"
            >
              {{ delayStatus }}
            </div>
            <div class="col text-end h6">
              ▲更新時間：{{ TWII.d.slice(4, 6) + "/" + TWII.d.slice(6, 9) }}
              {{ TWII.t }}
            </div>
          </div>
        </div>
      </div>
      <div class="other-market ps-2">
        <div class="row my-2">
          <div class="title h4 col-4 text-end my-1">櫃買指數</div>
          <div
            class="h3 col-4 text-end align-self-center my-1 change"
            :class="{
              up: TWOII.z > TWOII.y,
              down: TWOII.z < TWOII.y,
              unchange: TWOII.z === TWOII.y,
            }"
          >
            {{ TWOII.z }}
          </div>
          <div
            class="h5 col-4 text-center align-self-center my-1 percent"
            :class="{
              up: TWOII.z > TWOII.y,
              down: TWOII.z < TWOII.y,
              unchange: TWOII.z === TWOII.y,
            }"
          >
            <span v-show="TWOII.z > TWOII.y">▲</span>
            <span v-show="TWOII.z < TWOII.y">▼</span>
            {{ TWOII.change + " (" + TWOII.percent + "%)" }}
          </div>
        </div>
        <div style="border: 1px solid #5c5c5e"></div>
        <market_block :title="'S&P 500'" :symbol="GSPC" :delay="false" />
        <market_block :title="'道瓊指數'" :symbol="DJI" :delay="false" />
        <market_block :title="'那斯達克'" :symbol="IXIC" :delay="false" />
        <market_block :title="'費城半導體'" :symbol="SOX" :delay="false" />
        <market_block :title="'日經指數'" :symbol="N225" :delay="true" />
        <market_block :title="'韓國股市'" :symbol="KS11" :delay="true" />
        <market_block :title="'香港恒生'" :symbol="HSI" :delay="true" />
        <market_block :title="'上海股市'" :symbol="SSE" :delay="true" />
        <market_block :title="'英國指數'" :symbol="FTSE" :delay="true" />
        <market_block :title="'德國指數'" :symbol="GDAXI" :delay="true" />
        <market_block :title="'法國指數'" :symbol="FCHI" :delay="true" />
        <market_block :title="'荷蘭指數'" :symbol="AEX" :delay="true" />
      </div>
    </div>
  </div>
</template>
<script setup>
// import axios from "axios";
import {
  onMounted,
  reactive,
  ref,
  defineEmits,
  defineProps,
  watch,
  toRefs,
} from "vue";
import market_block from "./other-main-market/market-block.vue";

const emit = defineEmits(["search"]);

const props = defineProps({
  isPhone: Boolean,
});

const { isPhone } = toRefs(props);

const search = ref("");

const screenWidth = ref(null);

const submit = () => {
  emit("search", search);
  // search.value = "";
};

const createStockDataO = () => ({
  regularMarketPrice: "-", // 目前價格
  regularMarketDayRange: {
    low: 0, // 當日最高價
    high: 0, // 當日最低價
  },
  regularMarketPreviousClose: "-", // 昨日收盤價
  regularMarketOpen: "-", // 今日開盤價
  regularMarketChange: 0, // 漲跌指數
  regularMarketChangePercent: 0, // 漲跌百分比
  marketState: "", // 市場狀況，比如REGULAR指正常交易、CLOSED指收盤、PRE指盤前、POSTPOST指盤後(?)
  regularMarketTime: "", // 資料更新時間
  fiftyTwoWeekRange: {
    low: 0, // 52周內最低價
    high: 0, // 52周內最高價
  },
  fiftyTwoWeekChangePercent: 0, // 52周漲跌百分比
  fiftyDayAverage: "-", // 50天平均價格
  twoHundredDayAverage: "-", // 200天平均價格
});

const createStockDataT = () => ({
  c: "-", // 股票代號
  d: "-", // 最近交易日期
  t: "-", // 最近成交時間
  h: "-", // 最高價
  l: "-", // 最低價
  z: "-", // 目前成交價
  y: "-", // 昨天收盤價
  o: "-", // 開盤價
  v: "-", // 總成交量(百萬)
  n: "-", // 名字
  change: "-", // 漲跌點數
  percent: "-", // 漲跌百分比
});

// ※不能使用reactive(StockData)，因為會導致全部數值都被綁在StockData上
const TWII = reactive(createStockDataT()); // 台股大盤
const TWOII = reactive(createStockDataT()); // 上櫃指數
const GSPC = reactive(createStockDataO()); // S&P500指數
const DJI = reactive(createStockDataO()); // 道瓊工業指數
const IXIC = reactive(createStockDataO()); // NASDAQ指數
const SOX = reactive(createStockDataO()); // 費城半導體指數
const N225 = reactive(createStockDataO()); // 日經指數
const KS11 = reactive(createStockDataO()); // 韓國股市
const HSI = reactive(createStockDataO()); // 香港恒生
const SSE = reactive(createStockDataO()); // 上海股市
const FTSE = reactive(createStockDataO()); // 英國指數
const GDAXI = reactive(createStockDataO()); // 德國指數
const FCHI = reactive(createStockDataO()); // 法國指數
const AEX = reactive(createStockDataO()); // 荷蘭指數

const setStockDataO = async (stockData, response) => {
  // console.log(response); //都是undefine
  // console.log(response, response.regularMarketDayRange);

  if (response.regularMarketPrice)
    stockData.regularMarketPrice = response.regularMarketPrice;
  if (response.regularMarketDayRange.low)
    stockData.regularMarketDayRange.low = response.regularMarketDayRange.low;
  if (response.regularMarketDayRange.high)
    stockData.regularMarketDayRange.high = response.regularMarketDayRange.high;
  if (response.regularMarketPreviousClose)
    stockData.regularMarketPreviousClose = response.regularMarketPreviousClose;
  if (response.regularMarketOpen)
    stockData.regularMarketOpen = response.regularMarketOpen;
  if (response.regularMarketChange)
    stockData.regularMarketChange = response.regularMarketChange;
  if (response.regularMarketChangePercent)
    stockData.regularMarketChangePercent = response.regularMarketChangePercent;
  if (response.marketState) stockData.marketState = response.marketState;
  if (response.regularMarketTime)
    stockData.regularMarketTime = response.regularMarketTime;
  if (response.fiftyTwoWeekRange.low)
    stockData.fiftyTwoWeekRange.low = response.fiftyTwoWeekRange.low;
  if (response.fiftyTwoWeekRange.high)
    stockData.fiftyTwoWeekRange.high = response.fiftyTwoWeekRange.high;
  if (response.fiftyTwoWeekChangePercent)
    stockData.fiftyTwoWeekChangePercent = response.fiftyTwoWeekChangePercent;
  if (response.fiftyDayAverage)
    stockData.fiftyDayAverage = response.fiftyDayAverage;
  if (response.twoHundredDayAverage)
    stockData.twoHundredDayAverage = response.twoHundredDayAverage;
};

const setStockDataT = (stockData, response) => {
  stockData.c = response.c;
  stockData.d = response.d;
  stockData.t = response.t;
  stockData.h = response.h;
  stockData.l = response.l;
  stockData.z = response.z;
  stockData.y = response.y;
  stockData.o = response.o;
  stockData.v = response.v;
  stockData.n = response.n;
  stockData.change = Math.abs(response.z - response.y).toFixed(2);
  stockData.percent = (((response.z - response.y) / response.o) * 100).toFixed(
    2
  );
};
const tickers = [
  "^GSPC",
  "^DJI",
  "^IXIC",
  "^SOX",
  "^N225",
  "^KS11",
  "^HSI",
  "000001.SS",
  "^FTSE",
  "^GDAXI",
  "^FCHI",
  "^AEX",
];
const fetchStockForO = async () => {
  try {
    const responses = await Promise.all(
      tickers.map((tickers) =>
        fetch(`https://stock-view-wf7f.onrender.com/api/Ostock/${tickers}`)
      )
    );
    const stockData = await Promise.all(
      responses.map((response) => {
        return response.json();
      })
    );
    // stockData.forEach((i) => {
    //   // console.log(i);
    // });
    // console.log("setStockDataO");

    // console.log(stockData[0]);
    await setStockDataO(GSPC, stockData[0]);

    // console.log(stockData[1]);
    await setStockDataO(DJI, stockData[1]);

    // console.log(stockData[2]);
    await setStockDataO(IXIC, stockData[2]);

    // console.log(stockData[3]);
    await setStockDataO(SOX, stockData[3]);

    // console.log(stockData[4]);
    await setStockDataO(N225, stockData[4]);

    // console.log(stockData[5]);
    await setStockDataO(KS11, stockData[5]);

    // console.log(stockData[6]);
    await setStockDataO(HSI, stockData[6]);

    // console.log(stockData[7]);
    await setStockDataO(SSE, stockData[7]);

    // console.log(stockData[8]);
    await setStockDataO(FTSE, stockData[8]);

    // console.log(stockData[9]);
    await setStockDataO(GDAXI, stockData[9]);

    // console.log(stockData[10]);
    await setStockDataO(FCHI, stockData[10]);

    // console.log(stockData[11]);
    await setStockDataO(AEX, stockData[11]);

    // const response1 = await fetch("http://localhost:3000/stock/^GSPC");
    // setStockData(GSPC, await response1.json());
    // const response2 = await fetch("http://localhost:3000/stock/^DJI");
    // setStockData(DJI, await response2.json());
    // const response3 = await fetch("http://localhost:3000/stock/^IXIC");
    // setStockData(IXIC, await response3.json());
    // const response4 = await fetch("http://localhost:3000/stock/^SOX");
    // setStockData(SOX, await response4.json());
    // console.log(stockData);
  } catch (error) {
    console.log(error);
  }
};
// const fetchStockForTWII = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/stock/^TWII");
//     const data = await response.json();
//     setStockDataO(TWII, data);
//   } catch (error) {
//     console.log(error);
//   }
// };
const fetchStockForTW = async () => {
  try {
    const response = await fetch(
      "https://stock-view-wf7f.onrender.com/api/TWstock"
    );
    const stockData = await response.json();
    const data = stockData.data;
    setStockDataT(TWII, data[0]);
    setStockDataT(TWOII, data[1]);
  } catch (error) {
    console.log(error);
  }
};

// const fetchStockForTWOII = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/stock/^TWOII");
//     const data = await response.json();
//     // console.log(data.at(-1));
//     setStockDataO(TWOII, data);
//   } catch (error) {
//     console.log(error);
//   }
// };
const delayStatus = ref("收盤");
const updateTradingStatus = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const dayOfWeek = now.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    delayStatus.value = "收盤";
    return;
  }

  if (
    (hours === 8 && minutes >= 30 && minutes <= 59) ||
    (hours === 13 && minutes >= 25 && minutes < 30)
  ) {
    delayStatus.value = "試戳";
    return;
  }

  if ((hours >= 9 && hours < 13) || (hours === 13 && minutes < 25)) {
    delayStatus.value = "交易中";
    return;
  }

  delayStatus.value = "收盤";
};

const flagPhone = ref(false);

onMounted(async () => {
  fetchStockForTW();
  //   fetchStockForTWOII();
  fetchStockForO();
  updateTradingStatus();
});

setInterval(() => {
  if (delayStatus.value !== "收盤") {
    fetchStockForTW();
    fetchStockForO();
    updateTradingStatus();
  }
}, 6000);

onMounted(() => {
  screenWidth.value = document.body.clientWidth;
  flagPhone.value = screenWidth.value <= 768 ? true : false;
});

watch(isPhone, (newIsPhone) => {
  flagPhone.value = newIsPhone;
});
</script>

<style lang="css">
.market-overview,
.other-market {
  border-radius: 20px;
  border: 1px solid;
  background-color: var(--background-color-2);
  border-color: var(--border-color-1) !important;
}
.other-market {
  border: 1px solid;
  border-color: var(--border-color-2) !important;
  background-color: var(--background-color-3);
  overflow-y: scroll;
}
.other-market::-webkit-scrollbar {
  display: none;
}
.title {
  color: var(--primary-text-color) !important;
}
.up {
  color: var(--highlight-red) !important;
}
.down {
  color: var(--highlight-green) !important;
}
.unchange {
  color: var(--highlight-yellow) !important;
}
.v {
  color: var(--highlight-blue);
}
.time {
  color: var(--secondary-text-color) !important;
}
.input-group {
  width: auto !important;
  margin: 18px;
}
.input-group .form-control,
.input-group .input-group-text {
  background-color: var(--background-color-3);
  border-top: 0;
  border: none;
  /* border-color: var(--background-color-2); */
  border-radius: 20px;
}

input.form-control {
  color: var(--primary-text-color);
  border-bottom: 1px solid;
}
input.form-control::placeholder {
  color: var(--muted-text-color);
  opacity: 1;
}
input.form-control:focus {
  color: var(--primary-text-color);
  caret-color: var(--primary-text-color);
  outline: none;
  border-color: var(--background-color-2);
  box-shadow: none;
  background-color: var(--background-color-3);
}
.input-button {
  cursor: pointer;
}
.trading {
  margin: auto;
  border-radius: 8px;
}
/*收盤*/
.tradingClosed {
  background-color: #2b2b2b;
  color: #cccccc;
  border: 1px solid #4d4d4d;
}
/*交易中*/
.tradingOpen {
  background-color: #34c759;
  color: #ffffff;
  border: 1px solid #175024;
}
/*試戳*/
.tradingTest {
  background-color: #ff8c42;
  color: #ffffff;
  border: 1px solid #e07430;
}
</style>
