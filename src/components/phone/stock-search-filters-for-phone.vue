<!-- 搜尋and分類（右側區塊） -->
<template>
  <div>
    <div class="topDiv">
      <div class="back" @click="backToMarketOverview()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-left"
        >
          <path d="M14 18l-6-6 6-6"></path>
        </svg>
      </div>
      <div class="favorites" @click="appendFavorites()" v-if="!notFound">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#e2e5e9"
            stroke-width="2"
            :class="{ flag: favoritesClolor }"
          />
          <text
            x="7"
            y="18"
            font-size="20"
            fill="#e2e5e9"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            +
          </text>
        </svg>
      </div>
    </div>
    <div class="notFound" v-if="notFound">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="48px"
          height="48px"
          viewBox="0 0 90 90"
          enable-background="new 0 0 90 90"
          xml:space="preserve"
        >
          <image
            id="image0"
            width="90"
            height="90"
            x="0"
            y="0"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAIGNIUk0AAHomAACAhAAA+gAAAIDo AAB1MAAA6mAAADqYAAAXcJy6UTwAAAHpUExURQAAALm5ua+zt7Gzt6+yt6+yt7Cyt6+yuLCzuK+z uK6yubKysq2tua+zuLCyuLCzt6+zt6+yuK+yt7Cyt66ytq6ytq+yt7CzuLS0tLCzuK+yt6+yuLGx vLG0t6+yuKqqqq+zuLCyuLCzt6+0uLGxuLS0tJnMzLCyt6+yuLCyt6qqv6+zt7CyuK+yuK+0ubCw uq+zuLCyuK6uu6+zuK+zt7GzuKqqqrCzt7Cyt7CzuK+zt6+yuK+zuLGxt62zubCyt6+yt6+zt6+y ua+zuH9/f////6+zuLCztrCyt6+yt7Cyt6+yuK+zuK+zt7Gxtq+yt66yt7CyuK+zt6+yuLCzt6q2 trCyuK+zt7CyuLKyt7Kytq+zt7C0t6+zt6+zt7CyuK+zt6+yt7G0uLCyt7CzuKy0u7CyuK+zt7Cz t6q4uLa2trKysq6yua+zt7CzuLCzt7GzubCyt6+yt6+zt7CzuLCzuLCzuLCzt6+zt6+ztq+yt7Cz uLCzt7C0ubGxubCzuL+/v6+yt6+zuK23t7CzuK+zt66xt7GxubCyt6+zuLa2tq+yuK2zuLCyuKq7 u7CwsK+zuLGxtq+yuLCzuK6xuL+/v66zuK61tbCwt7Gxt7Czt7CzuLCzt6+0uLCyuLCzt6+yt7Cz uP////Pz3uYAAAChdFJOUwALR3mgyN3u+cdGChZwwm89sfv6PD/BwBii/qoXUlAGkealbSQRBW7n jwy66pAzNOu4E8rhbAniycaA+NUrLNanjk2UAgGNUZKT7aPU1y6+OYKH5K8V3IG/MjXoRHrbeJ7a SMXfIn/e7BIHFEnEpqhfmcvl9phe6UBKt/y2Nzu8BJqKGamEViGIcw50L4kPDdg4rZVMCDYmJ09O /bI64PP3V0pQ6gAAAAFiS0dERY6zqFcAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfpAQ4G LyF62OroAAAEIUlEQVRYw+2Y+VsSQRjHlzBZwTO0AirIg5KggJJEO7SklLIyzQ5NTTtQKkuttCyz rMwO7b6P/U+jeWeW3YVlZhd9np4n3t/eme/7YfadmXdm4Lic5Sxny2iGVca81fkmnjflF+QZzZbl 4hYWFfOCzPjiksJlAJeWrRHSmLWsPEtwxVpB1daVZgFeb7MLmcyxQS95o0mgmGmTLrDTJRny5soq c3WN211Tbd5SuTXZbq91ayd7tonxXt92ed8Ol1/sDHi0koM7SeyuulBqd6hqN+mvD2ojW8JkkblU RhVqaMSSnZrG7STZ2LNXXbRvP8mJlny7cFBTxi1tcGBZMzv5AF4bB1sy6yKH8Do5zEpej9dzK13a Bsooa0k5grPRQpe24JzksZErIB1HmUqnpx1SwlasoCI17mUSc8eg4B5n0Z6AT+xgzB53EvQswy6D PRhikCIzdKKALrqy0IqUdaxkjiuCbXuKUehlHnSiKECtqqIKi5HOJ8Z1dPPdpxU/pGhsRSFnqJmD CT9LIAXIDcvYysZzsKRoH2qGyk/cDlwlGqQaZWOkB7m9FPR5pKokbjem9Ek1KY1NyO2noPPkU0Iu II1STUpjCXIHKGhIo1k5wAvpRi02DiJ3iIK+iFSXiHsaUy5LNSmN1ci9QkHHkGqYuCE4yIZks5/S GES+n4KGPDqTmIY+vu+yYl0pG52p88GAZrIRFMRTVFF5QtgsDkcNRaWYRjaDadxFUcHiW6UNfRUF XaOoYMts0YaGammjqIxIdV0behQFGSkqXJ4iyvb4jZtj4xMT42O3bseVfZE7KGiSgrbA6tshj526 e08Q7d70lDzmPhwzBtrHwVHgkjaVhwWFhR9I++GeM0PNG1Qxb/IS8nBWSGOzyV1liTGepvjYTZ50 j4S0VisK8LH7mIrGl4Xd4rDvpEfHSL9hHPlzdDJXDqFPFOiJpqfPQqFnT0cnBPm2ngef6Wa2DurY Pmmo9/kC6V54gS4H5E79kmecxL9WCtfJ/XgxPZzv3PrqtVTw2mcykZfX4hIS298woTkbfKKD5RL8 FrSMl2BuA766t9Gl70Dpj9OlYO+1Pjg0PHpr8QpzZHy3LeJsaHkmce4ADmo/pi56uUTW+PSIBrZl CEdZXYsqCvFJmrDABw3sYD0J6yxJ86ixFI3L9qamcXsCYpy/9aOsfkfut8WU+14T290s+dOip6lk 8FON0zn8ebBoVFJV7M3Tetjcl6hAMf9XbkQfe9j1LSPZ8ff94vyuZy4TZfC4OngG1w2d4+a4H13W dFzrXLKK6mZz8aozjXLumpk62Zmin524mvb2D4Tzo7zV9POazTiZcnZnw6aZ3rnMsf8v9kquQZHt y56lxv4VyZ6lwv7NcIfRyR5YAXKC7fv1e0Dzn9qMFlmBROcsZ/+U/QFeqG0nJwO1dAAAACV0RVh0 ZGF0ZTpjcmVhdGUAMjAyNS0wMS0xNFQwNjo0NzozMyswMDowMI7nPPYAAAAldEVYdGRhdGU6bW9k aWZ5ADIwMjUtMDEtMTRUMDY6NDc6MzMrMDA6MDD/uoRKAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAy MDI1LTAxLTE0VDA2OjQ3OjMzKzAwOjAwqK+llQAAAABJRU5ErkJggg=="
          />
        </svg>
      </div>
      <span> 未找到符合的股票 </span>
    </div>
    <div class="stock-serch-filters" v-else>
      <div class="mainDisplay">
        <div class="stockCode" title="股票代號">
          {{ targetStockData.c }}
        </div>
        <div class="stockName h1" title="股票名稱">
          {{ targetStockData.n }}
          <span
            class="hypothesis"
            v-if="hypothesis"
            title="若呼叫價格時出錯畫面上價格便會顯示'-'，為了防止這種狀況此時成交價會用「五檔買入第一檔」的價格作為代替"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M9.09 9a3 3 0 0 1 5.83 1c0 1.5-1 2-1.82 2.4C12.36 12.9 12 13.1 12 14"
              />
              <line x1="12" y1="17" x2="12" y2="17" />
            </svg>
          </span>
        </div>

        <div class="priceDiv">
          <div class="row">
            <!-- 目前價格 -->
            <span class="mainPrice col">
              <span
                :class="{
                  limitUp: targetStockData.z == targetStockData.u,
                  limitDown: targetStockData.z == targetStockData.w,
                  up: targetStockData.z > targetStockData.y,
                  down: targetStockData.z < targetStockData.y,
                  unchange: targetStockData.z === targetStockData.y,
                }"
                >{{ (targetStockData.z * 1).toFixed(2) }}</span
              >

              <div
                class="col h5"
                :class="{
                  up: targetStockData.z > targetStockData.y,
                  down: targetStockData.z < targetStockData.y,
                  unchange: targetStockData.z === targetStockData.y,
                }"
              >
                <!-- 百分比 -->
                <span v-show="targetStockData.z > targetStockData.y"> ▲ </span>
                <span v-show="targetStockData.z < targetStockData.y"> ▼ </span>
                {{ targetStockData.change
                }}{{ "(" + targetStockData.percent + "%)" }}
              </div>
            </span>

            <div class="row col h4 p-0">
              <!-- 最高價 -->
              <span class="unchange col-6">最高 </span>
              <span
                class="high col-6 text-start p-0"
                :class="{
                  up: targetStockData.h > targetStockData.y,
                  down: targetStockData.h < targetStockData.y,
                  unchange: targetStockData.h === targetStockData.y,
                }"
              >
                {{
                  isNaN((targetStockData.h * 1).toFixed(2))
                    ? "-"
                    : (targetStockData.h * 1).toFixed(2)
                }}
              </span>
              <!-- 最低價 -->
              <span class="unchange col-6">最低 </span>
              <span
                class="low col-6 text-start p-0"
                :class="{
                  up: targetStockData.l > targetStockData.y,
                  down: targetStockData.l < targetStockData.y,
                  unchange: targetStockData.l === targetStockData.y,
                }"
              >
                {{
                  isNaN((targetStockData.l * 1).toFixed(2))
                    ? "-"
                    : (targetStockData.l * 1).toFixed(2)
                }}
              </span>
            </div>
          </div>
          <div class="row">
            <!-- 上市或上櫃 -->
            <span class="col tseOrOtc border h2 p-0">
              {{ targetStockData.ex }}
            </span>
            <!-- 更新時間 -->
            <span class="col time h6">
              ▲更新時間：{{
                targetStockData.d.slice(4, 6) +
                "/" +
                targetStockData.d.slice(6, 9)
              }}
              {{ targetStockData.t }}
            </span>
          </div>
          <div class="fiveTick">
            <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th
                    class="col"
                    colspan="2"
                    style="background-color: #e61919; width: 50%"
                  >
                    買入
                  </th>
                  <th
                    class="col"
                    colspan="2"
                    style="background-color: #3ec23e; width: 50%"
                  >
                    賣出
                  </th>
                </tr>
              </thead>
              <tbody class="h3">
                <tr>
                  <td>{{ targetStockData.g[0] }}</td>
                  <td
                    :class="{
                      marketOrder: targetStockData.b[0] == '市價',
                      up: targetStockData.b[0] > targetStockData.y,
                      down: targetStockData.b[0] < targetStockData.y,
                      unchange: targetStockData.b[0] === targetStockData.y,
                    }"
                  >
                    {{
                      targetStockData.b[0] == "市價"
                        ? "市價"
                        : isNaN((targetStockData.b[0] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.b[0] * 1).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="{
                      marketOrder: targetStockData.a[0] == '市價',
                      up: targetStockData.a[0] > targetStockData.y,
                      down: targetStockData.a[0] < targetStockData.y,
                      unchange: targetStockData.a[0] === targetStockData.y,
                    }"
                  >
                    {{
                      targetStockData.a[0] == "市價"
                        ? "市價"
                        : isNaN((targetStockData.a[0] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.a[0] * 1).toFixed(2)
                    }}
                  </td>
                  <td>{{ targetStockData.f[0] }}</td>
                </tr>
                <tr>
                  <td>{{ targetStockData.g[1] }}</td>
                  <td
                    :class="{
                      up: targetStockData.b[1] > targetStockData.y,
                      down: targetStockData.b[1] < targetStockData.y,
                      unchange: targetStockData.b[1] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.b[1] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.b[1] * 1).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="{
                      up: targetStockData.a[1] > targetStockData.y,
                      down: targetStockData.a[1] < targetStockData.y,
                      unchange: targetStockData.a[1] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.a[1] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.a[1] * 1).toFixed(2)
                    }}
                  </td>
                  <td>{{ targetStockData.f[1] }}</td>
                </tr>
                <tr>
                  <td>{{ targetStockData.g[2] }}</td>
                  <td
                    :class="{
                      up: targetStockData.b[2] > targetStockData.y,
                      down: targetStockData.b[2] < targetStockData.y,
                      unchange: targetStockData.b[2] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.b[2] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.b[2] * 1).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="{
                      up: targetStockData.a[2] > targetStockData.y,
                      down: targetStockData.a[2] < targetStockData.y,
                      unchange: targetStockData.a[2] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.a[2] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.a[2] * 1).toFixed(2)
                    }}
                  </td>
                  <td>{{ targetStockData.f[2] }}</td>
                </tr>
                <tr>
                  <td>{{ targetStockData.g[3] }}</td>
                  <td
                    :class="{
                      up: targetStockData.b[3] > targetStockData.y,
                      down: targetStockData.b[3] < targetStockData.y,
                      unchange: targetStockData.b[3] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.b[3] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.b[3] * 1).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="{
                      up: targetStockData.a[3] > targetStockData.y,
                      down: targetStockData.a[3] < targetStockData.y,
                      unchange: targetStockData.a[3] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.a[3] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.a[3] * 1).toFixed(2)
                    }}
                  </td>
                  <td>{{ targetStockData.f[3] }}</td>
                </tr>
                <tr>
                  <td>{{ targetStockData.g[4] }}</td>
                  <td
                    :class="{
                      up: targetStockData.b[4] > targetStockData.y,
                      down: targetStockData.b[4] < targetStockData.y,
                      unchange: targetStockData.b[4] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.b[4] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.b[4] * 1).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="{
                      up: targetStockData.a[4] > targetStockData.y,
                      down: targetStockData.a[4] < targetStockData.y,
                      unchange: targetStockData.a[4] === targetStockData.y,
                    }"
                  >
                    {{
                      isNaN((targetStockData.a[4] * 1).toFixed(2))
                        ? "-"
                        : (targetStockData.a[4] * 1).toFixed(2)
                    }}
                  </td>
                  <td>{{ targetStockData.f[4] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="otherInfo h6">
        <table
          class="table table-dark table-striped border-top border-secondary"
        >
          <tbody>
            <tr>
              <td colspan="2">
                成交量：<span class="v">{{ targetStockData.v }}</span>
              </td>
            </tr>
            <tr>
              <td>
                漲停價：<span
                  :class="{
                    up: targetStockData.u > targetStockData.y,
                    down: targetStockData.u < targetStockData.y,
                    unchange: targetStockData.u === targetStockData.y,
                  }"
                  >{{ (targetStockData.u * 1).toFixed(2) }}</span
                >
              </td>
              <td>
                跌停價：<span
                  :class="{
                    up: targetStockData.w > targetStockData.y,
                    down: targetStockData.w < targetStockData.y,
                    unchange: targetStockData.w === targetStockData.y,
                  }"
                  >{{ (targetStockData.w * 1).toFixed(2) }}</span
                >
              </td>
            </tr>
            <tr>
              <td>
                開盤：{{
                  isNaN((targetStockData.o * 1).toFixed(2))
                    ? "-"
                    : (targetStockData.o * 1).toFixed(2)
                }}
              </td>
              <td>昨收：{{ (targetStockData.y * 1).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="annotation" v-if="hypothesis">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M9.09 9a3 3 0 0 1 5.83 1c0 1.5-1 2-1.82 2.4C12.36 12.9 12 13.1 12 14"
          />
          <line x1="12" y1="17" x2="12" y2="17" />
        </svg>
        <span
          >：若呼叫價格時出錯畫面上價格便會顯示
          "-"，為了防止這種狀況此時成交價會用「五檔買入第一檔」的價格作為代替。</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps, reactive, watch, ref, onMounted } from "vue";
import { Message } from "vue-devui";

let stockData = [];

const hypothesis = ref(false);

const notFound = ref(false);

const favoritesClolor = ref(false);

const localStorageStore = ref([]);

// 紀錄是否查詢過，若沒查詢過則先不開始setinterval的更新畫面（setinterval還是會繼續跑）
const inquiredBefore = ref(false);

// 記得使用prop的值時要.prop內的東西，比如下面CodeOrName要使用時就要
// CodeOrName.search，若是ref則再加.value
const codeOrname = defineProps(["search"]);

// const codeOrNameTemp=ref('')

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
  a: [], // 五檔價格（賣出）低至高
  b: [], // 五檔價格（買入）低至高
  f: [], // 五檔掛賣數量，價格由低至高
  g: [], // 五檔掛買數量，價格由低至高
  u: 0, // 漲停價
  w: 0, // 跌停價
  pz: "-", // 試戳價格（不確定，所以還沒set）
  ex: "-",
});

const setStockDataT = (stockData, response) => {
  hypothesis.value = false;
  stockData.c = response.c;
  stockData.d = response.d;
  stockData.t = response.t;
  stockData.h = response.h;
  stockData.l = response.l;
  stockData.a = response.a.split("_"); // 賣出價格的五檔
  stockData.a.pop();
  stockData.b = response.b.split("_"); // 買入價格的五檔
  stockData.b.pop();
  stockData.f = response.f.split("_"); // 掛賣五檔數量
  stockData.f.pop();
  stockData.g = response.g.split("_"); // 掛買五檔數量
  stockData.g.pop();
  stockData.z = response.z;
  // 當api抓不到目前成交價格時，用買入第一檔來代替
  if (stockData.z === "-") {
    stockData.z = stockData.b[0] ? stockData.b[0] : stockData.a[0];
    hypothesis.value = true;
    // console.log(stockData.z);
  }
  // 鎖跌停時
  if (stockData.b && stockData.a[0] == 0) {
    stockData.z = stockData.l; // 跌停
    stockData.a[0] = "市價";
  }
  // 鎖漲停時
  else if (stockData.a && stockData.b[0] == 0) {
    stockData.z = stockData.h; // 漲停
    stockData.b[0] = "市價";
  }
  stockData.y = response.y;
  stockData.o = response.o;
  stockData.v = response.v;
  stockData.n = response.n;
  stockData.change = Math.abs(stockData.z - stockData.y).toFixed(2);
  stockData.percent = isNaN(
    (((stockData.z - stockData.y) / stockData.o) * 100).toFixed(2)
  )
    ? "-"
    : (((stockData.z - stockData.y) / stockData.o) * 100).toFixed(2);
  stockData.u = response.u * 1;
  stockData.w = response.w * 1;
  stockData.ex = response.ex == "tse" ? "上市" : "上櫃";
};

let targetStockData = reactive(createStockDataT());

const getStockData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/stockData");
    stockData = await response.json();
    // console.log(stockData);
  } catch (error) {
    console.log(error);
  }
};

let search = () => {
  console.log(codeOrname.search);

  try {
    let flag = true;
    for (let i = 0; i < stockData.length; i++) {
      const element = stockData[i];
      // trim()能夠去掉字串左右的空格
      if (
        element.code == codeOrname.search.value.trim() ||
        element.name == codeOrname.search.value.trim()
      ) {
        flag = false;
        return element.search;
      }
    }
    if (flag) {
      console.log(codeOrname.search, "沒有符合的股票");
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
};
let fetchStock = async (stockCode) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/TWstock/${stockCode}`
    );
    const stockData = await response.json();
    const data = await stockData.data;
    setStockDataT(targetStockData, data[0]);
    console.log(data[0]);

    return data[0];
  } catch (error) {
    console.log(error);
  }
};
getStockData();

const emit = defineEmits(["back-to-market-overview"]);
const backToMarketOverview = () => {
  emit("back-to-market-overview");
  favoritesClolor.value = false;
  inquiredBefore.value = false;
  // codeOrNameTemp.value=''
};

watch(
  codeOrname,
  (newCodeOrName, oldCodeOrName) => {
    if (
      newCodeOrName.search.value !== oldCodeOrName.search.value ||
      typeof newCodeOrName.search.value !== "undefined"
    ) {
      inquiredBefore.value = true;
      console.log(newCodeOrName.search.value);
      // codeOrNameTemp.value=codeOrname.search.value
      let s = search();
      if (s) {
        fetchStock(s);
        notFound.value = false;
        if (localStorageStore.value.length > 0) {
          localStorageStore.value.map((item) => {
            if (item.code == s.slice(4, -3)) {
              // s.slice(4, -3)是為了拿到此時的股票代碼
              // 若是直接拿 targetStockData.c 的話很大機率異步處理還沒完成
              // 所以用slice，例：(tse_2330.tw).slice(4, -3) = 2330
              // 當 2330 有在 localStorageStore 中表示他有在最愛內
              favoritesClolor.value = true;
              // console.log(item.code);
            }
          });
        }
      } else {
        notFound.value = true;
      }
    }
  },
  { deep: true }
);

const appendFavorites = () => {
  favoritesClolor.value = !favoritesClolor.value;
  if (favoritesClolor.value === true) {
    // 增加到最愛（通知）
    Message.success(`${targetStockData.c} ${targetStockData.n}`);
    /* 增加最愛 */
    // 將股票資料先存在localStorageStore內
    localStorageStore.value = [
      ...localStorageStore.value,
      { code: targetStockData.c, name: targetStockData.n },
    ];
    // 再把localStorageStore內的json轉成字串後存到localStorage
    localStorage.setItem("favorite", JSON.stringify(localStorageStore.value));
  } else {
    // 移除最愛（通知）
    Message.error(`${targetStockData.c} ${targetStockData.n}`);
    /* 刪除最愛 */
    if (localStorageStore.value.length > 0) {
      // 利用filter過濾掉同代號的股票達成刪除效果
      localStorageStore.value = localStorageStore.value.filter(
        (item) => item.code != targetStockData.c
      );
      // 再將資料存到localStorage上
      localStorage.setItem("favorite", JSON.stringify(localStorageStore.value));
    }
  }
};

// setInterval(() => {
//   codeOrname.search.value=codeOrNameTemp.value
// }, 6000);

onMounted(() => {
  // 網頁載入時從localStorage上拿資料
  localStorageStore.value = JSON.parse(localStorage.getItem("favorite")) || [];
  setInterval(() => {
    if (inquiredBefore.value) {
      let s = search();
      if (s) {
        fetchStock(s);
        notFound.value = false;
        // console.log("手機更新");
      }
    }
  }, 6000);
});
</script>

<style>
.topDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 5vw 0 5vw;
}
.favorites {
  cursor: pointer;
}
.favorites path.flag {
  fill: #ff5151;
}
.mainPrice {
  font-size: 10vw;
}
.tseOrOtc {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 8px;
}
.annotation {
  margin: 0px 16px 0px 16px;
}
.annotation svg {
  margin-right: 8px;
}
.notFound {
  color: var(--secondary-text-color);
}
</style>
