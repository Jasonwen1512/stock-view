<template>
  <div class="row">
    <favorite_wrapper
      v-if="flagPhone"
      @searchForFavorite="goTostockSearchFiltersForPhone"
    />
    <transition name="switch-page">
      <market_overview
        class="col-xl-5 col-md-5 col-xs-6 market-overview"
        v-if="flagMain"
        @search="goTostockSearchFiltersForPhone"
        :isPhone="flagPhone"
      />
    </transition>
    <transition name="switch-page">
      <stock_search_filters_for_phone
        class="col-xl-7 col-md-7 col-xs-6 stock-search-filters-for-phone"
        v-if="flagPhone"
        :search="searchData"
        @back-to-market-overview="backToMarketOverview"
      />
    </transition>
    <transition name="switch-page">
      <stock_search_filters_for_pc
        class="col-xl-7 col-xl-7 col-md-7 col-xs-6"
        v-if="!flagPhone"
      />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import market_overview from "./components/market-overview.vue";
import stock_search_filters_for_phone from "./components/phone/stock-search-filters-for-phone.vue";
import favorite_wrapper from "./components/phone/favorite-wrapper.vue";
import stock_search_filters_for_pc from "./components/pc/stock-search-filters-for-pc.vue";

const screenWidth = ref(null);
const flagMain = ref(true);
const flagPhone = ref(false);
const codeOrNameTemp = ref("");
// const repeatSearchStatus = ref(false);

const searchData = ref("");

const goTostockSearchFiltersForPhone = (value) => {
  codeOrNameTemp.value = value;
  searchData.value = value;
  console.log(searchData.value);
  flagMain.value = false;
};

const backToMarketOverview = () => {
  flagMain.value = true;
  searchData.value = "";
};

// const repeatSearch = () => {
//   console.log(codeOrNameTemp.value);

//   codeOrNameTemp.value = (String(codeOrNameTemp.value).trim());
//   switch (repeatSearchStatus.value) {
//     case true:
//       goTostockSearchFiltersForPhone(codeOrNameTemp.value + "  ");
//       repeatSearchStatus.value = !repeatSearchStatus.value;
//       console.log(
//         "手機更新1",
//         typeof codeOrNameTemp.value,
//         codeOrNameTemp.value
//       );
//       break;
//     case false:
//       goTostockSearchFiltersForPhone(codeOrNameTemp.value + " ");
//       repeatSearchStatus.value = !repeatSearchStatus.value;
//       console.log(
//         "手機更新0",
//         typeof codeOrNameTemp.value,
//         codeOrNameTemp.value
//       );
//   }
// };

// setInterval(() => {
//   if (inquiredBefore.value) {
//     console.log(
//       "類型:",
//       typeof codeOrNameTemp.value,
//       "值:",
//       codeOrNameTemp.value
//     );
//     repeatSearch();
//   }
// }, 6000);

onMounted(() => {
  screenWidth.value = document.body.clientWidth;
  flagPhone.value = screenWidth.value <= 768 ? true : false;
  window.onresize = () => {
    screenWidth.value = document.body.clientWidth;
  };
});
watch(
  screenWidth,
  (newScreenWidth) => {
    flagPhone.value = newScreenWidth <= 768 ? true : false;
    if (newScreenWidth > 768) flagMain.value = true;
    console.log(flagPhone.value);
  },
  { deep: true }
);
</script>

<style>
:root {
  /* 背景顏色 */
  --background-color-1: #1c1c1d;
  --background-color-2: #252728;
  --background-color-3: #333334;
  --background-color-4: #778da9;
  --background-color-5: #e0e1dd;

  /* 文字顏色 */
  --primary-text-color: #e2e5e9; /* 白色文字 */
  --secondary-text-color: #b0b3b8; /* 輔助文字 */
  --highlight-text-color: #ffcc00; /* 強調文字 */
  --muted-text-color: #9aa5b1; /* 無效或不活躍文字 */

  /* 強調色 */
  --highlight-red: #e61919;
  --highlight-blue: #4cafff;
  --highlight-green: #3ec23e;
  --highlight-yellow: #ffff37;

  /* 提示顏色 */
  --error-color: #f44336;
  --success-color: #4caf50;

  /* 邊框顏色 */
  --border-color-1: #4a4a4c; /* 用於背景 1 */
  --border-color-2: #5c5c5e; /* 用於背景 2 */
  --border-color-3: #6d6d70; /* 用於背景 3 */
  --border-color-4: #1a1a1b; /* 用於內嵌邊框 */
  --border-color-5: #242425; /* 用於暗色系的點綴 */

  /* 漸層色 */
  --gradient-purple-blue: linear-gradient(90deg, #6a1b9a, #1976d2);
  --gradient-gray-black: linear-gradient(180deg, #2b2b2b, #000000);
}
/* .col-xs <576px 手機
.col-sm-	≥576px
.col-md-	≥768px 平板
.col-lg-	≥992px
.col-xl-	≥1200px 電腦
.col-xxl- ≥1400px */

/* 電腦 */
@media screen and (min-width: 768px) {
  #app {
    margin-top: 0 !important;
  }
  body {
    padding: 60px !important;
  }
  #app > .row {
    max-height: 100%;
  }
  .time {
    margin: 20px 10px 20px 10px !important;
  }
  .time div {
    align-self: center;
  }
  .time .h6 {
    font-size: 1.5rem;
  }
  .other-market {
    max-height: calc(100vh - 430px);
  }
  .other-market.ps-2 {
    padding-left: 0 !important;
  }
  .other-market .text-end {
    text-align: center !important;
  }
  .main-market .title.h2 {
    margin-top: 30px;
    font-size: 3rem;
  }
  .market-overview {
    border: 0;
  }
  .market-overview:not(.market-overview.pt-0) {
    padding: 20px;
    border-radius: 20px;
  }
  .mainPrice {
    font-size: 4rem;
  }
  .tseOrOtc {
    display: inline;
    font-size: 3rem;
    border: 1px solid var(--border-color-2);
    border-radius: 10px;
    padding: 0.8rem 1.2rem;
  }
  .trading {
    font-size: 2rem;
    border-radius: 16px;
  }
  .h6,
  h6 {
    font-size: 1.5rem;
  }
  .fiveTick {
    margin-top: 1rem;
    border-top: 1px solid rgb(108, 117, 125);
  }
  .fiveTick,
  .otherInfo {
    border-left: 1px solid rgb(108, 117, 125);
    border-right: 1px solid rgb(108, 117, 125);
  }
}
@media screen and (max-width: 1200px) and (min-width: 768px) {
  .other-market.ps-2 {
    padding-right: 0.5rem !important;
  }
}
/* 手機 */
@media screen and (max-width: 768px) {
  #app {
    margin-top: 40px !important;
  }
  html {
    overflow-x: hidden !important;
  }
  html body {
    background-color: var(--background-color-2) !important;
    max-height: 100vh;
    overflow: hidden !important;
  }
  .market-overview {
    border: 0 !important;
  }
  .main-market {
    padding-left: 10px;
    padding-right: 10px;
  }
  .other-market {
    /* calc內可以做運算 100vh代表螢幕可見高度本身*/
    max-height: calc(100vh - 301px);
  }
  .switch-page-enter-active {
    transition: all 0.3s ease-out;
  }
  .switch-page-leave-active {
    transition: all 0.3s ease-in;
  }
  .switch-page-enter-from,
  .switch-page-leave-to {
    opacity: 0;
    /* width: 0; */
    transform: translateX(-100%);
  }
  .v-leave-from,
  .v-enter-to {
    opacity: 1;
    /* width: 100%; */
    transform: translateX(0);
  }

  .other-market.ps-2 {
    border-radius: 0px;
    border-left: 0;
    border-right: 0;
    padding-left: 0 !important;
  }
  .other-market > div > .title {
    font-size: 1.3rem;
    padding-right: 15px !important;
  }
  .other-market > div > .change {
    padding-right: 15px !important;
  }
  .other-market > div > .percent {
    padding-left: 30px;
    text-align: start !important;
  }
  .row {
    margin-right: 0 !important;
  }
  .row > * {
    padding-right: 0 !important;
  }
  .trading {
    font-size: 30px;
    padding-left: calc(var(--bs-gutter-x) * 0.25) !important;
    margin-left: 5px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-text-color);
  margin-top: 60px;
}
html body {
  background-color: var(--background-color-1);
  height: 100vh;
}

.up {
  color: var(--highlight-red);
}
.down {
  color: var(--highlight-green);
}
.unchange {
  color: var(--highlight-yellow);
}
.marketOrder {
  color: var(--primary-text-color) !important;
}

/*漲停*/
.limitUp {
  background-color: var(--highlight-red);
  color: var(--primary-text-color) !important;
}
/*跌停*/
.limitDown {
  background-color: var(--highlight-green);
  color: var(--primary-text-color) !important;
}
</style>
