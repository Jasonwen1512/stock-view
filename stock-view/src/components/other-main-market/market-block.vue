<template>
  <div class="row">
    <div class="delay" v-if="market.delay">▼延遲報價</div>
    <div class="title h4 col-4 my-1 text-end">
      {{ market.title }}
    </div>
    <div
      class="h3 col-4 text-end align-self-center my-1 change"
      :class="{
        up:
          market.symbol.regularMarketPrice >
          market.symbol.regularMarketPreviousClose,
        down:
          market.symbol.regularMarketPrice <
          market.symbol.regularMarketPreviousClose,
        unchange:
          market.symbol.regularMarketPrice ===
          market.symbol.regularMarketPreviousClose,
      }"
    >
      {{ market.symbol.regularMarketPrice }}
    </div>
    <div
      class="h5 col-4 text-center align-self-center my-1 percent"
      :class="{
        up:
          market.symbol.regularMarketPrice >
          market.symbol.regularMarketPreviousClose,
        down:
          market.symbol.regularMarketPrice <
          market.symbol.regularMarketPreviousClose,
        unchange:
          market.symbol.regularMarketPrice ===
          market.symbol.regularMarketPreviousClose,
      }"
    >
      <span
        v-show="
          market.symbol.regularMarketPrice >
          market.symbol.regularMarketPreviousClose
        "
        >▲</span
      >
      <span
        v-show="
          market.symbol.regularMarketPrice <
          market.symbol.regularMarketPreviousClose
        "
        >▼</span
      >
      {{
        Math.abs(market.symbol.regularMarketChange.toFixed(2)) +
        " (" +
        market.symbol.regularMarketChangePercent.toFixed(2) +
        "%)"
      }}
      <!-- {{ "(" + market.symbol.regularMarketChangePercent.toFixed(2) + "%)" }} -->
    </div>
  </div>
  <div style="border: 1px solid #5c5c5e"></div>
</template>
<script setup>
import { defineProps } from "vue";

const market = defineProps({
  title: {
    type: String,
    required: true,
  },
  symbol: {
    type: Object,
    require: true,
  },
  delay: {
    type: Boolean,
    require: true,
  },
});
</script>

<style>
.other-market .row {
  justify-content: center;
  align-items: center;
}
.other-market .row:nth-child(4n + 3) {
  background-color: var(--background-color-1);
}
.delay {
  background-color: rgb(192, 125, 2);
  color: black;
  font-size: 11px;
}
</style>
