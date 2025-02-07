<template>
  <div
    class="align-items-center justify-content-center flex-wrap h-100"
    :class="localStorageStore.length > 0 ? 'd-block' : 'd-flex'"
  >
    <div class="favorite-for-pc row g-4" v-if="localStorageStore.length > 0">
      <div
        class="col-md-6 col-xl-3"
        v-for="item in localStorageStore"
        :key="item"
        @click="jumpToStockSearchForPc(item.code)"
      >
        <div class="card">
          <div class="card-text">{{ item.code }}</div>
          <span class="card-footer">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-else class="initialFavorites h3">將股票加入到最愛</div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineEmits } from "vue";

const localStorageStore = ref([]);
const tempCode = ref("");
const emit = defineEmits(["searchForFavorite"]);

const jumpToStockSearchForPc = (code) => {
  tempCode.value = code;
  emit("searchForFavorite", tempCode.value);
};

onMounted(() => {
  localStorageStore.value = JSON.parse(localStorage.getItem("favorite")) || [];
  console.log(localStorageStore);
});
</script>
<style>
.favorite-for-pc {
  overflow-y: scroll;
  max-height: calc(100vh - 120px - 46px - 2rem);
}
.favorite-for-pc::-webkit-scrollbar {
  display: none;
}
.card {
  cursor: pointer;
}
.card-text {
  font-size: 1.5rem;
}
.card-footer {
  font-size: 1.8rem;
}
.initialFavorites {
  color: var(--secondary-text-color) !important;
}
</style>
