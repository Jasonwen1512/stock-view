<template>
  <div
    class="favorite-wrapper"
    :class="{
      expand: visible,
    }"
    style="width: auto"
  >
    <div class="svgAndMyfavorite" @click="showCodeList()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          fill="#333334"
          fill-opacity="1"
        />
        <path
          d="M13 16l-4-4 4-4"
          fill="none"
          stroke="#e2e5e9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="myfavorite">
        <div>我的最愛</div>
        <ul>
          <li
            v-for="item in localStorageData"
            :key="item"
            @click="jumpToStockSearchFiltersForPhone(item.code)"
          >
            {{ item.code }} {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="overlay" v-show="visible" @click="visible = !visible"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const localStorageData = ref([]);
const tempCode = ref("");
const visible = ref(false);
const emit = defineEmits(["searchForFavorite"]);

const showCodeList = () => {
  visible.value = !visible.value;
  // 每點擊一次最愛就從localStorage抓資料
  localStorageData.value = JSON.parse(localStorage.getItem("favorite"));
};

const jumpToStockSearchFiltersForPhone = (code) => {
  tempCode.value = code;
  emit("searchForFavorite", tempCode);
};

onMounted(() => {
  localStorageData.value = JSON.parse(localStorage.getItem("favorite"));
  //   console.log(localStorageData.value);
});
</script>

<style>
.svgAndMyfavorite {
  display: flex;
}
.svgAndMyfavorite > svg {
  transform: translate(12px, -6px);
}
.myfavorite {
  background-color: #333334;
  /* opacity: 0.5; */
  border-radius: 0 12px 12px 12px;
  padding: 5px;
  color: #e2e5e9;
  width: 200px;
  font-size: 20px;
}
.myfavorite div {
  border-bottom: 1px solid;
}
.myfavorite ul {
  max-height: 432px;
  overflow-y: scroll;
}
.myfavorite li {
  list-style: none;
  padding-top: 6px;
  cursor: pointer;
}
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  /* border: 1px solid; */
  top: 0;
  left: 0;
  z-index: -1;
}
.favorite-wrapper {
  width: auto;
  position: fixed;
  top: 27vw;
  /*正常：right: -83%;*/
  /*展開：right: -30%;*/
  right: -200px;
  transition: all 0.2s ease-out;
  z-index: 1;
}
.favorite-wrapper.expand {
  right: 5px;
}
</style>
