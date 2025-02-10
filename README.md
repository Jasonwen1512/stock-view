# 簡易看盤軟體 Stock-view
Stock-View 是一個即時股市資訊查詢網站，提供大盤指數與個股數據，並具備「收藏最愛」功能，方便使用者快速查找關注的股票。 <br>
https://jasonwen1512.github.io/stock-view/

### ※注意事項
- 由於使用Render來架設後端，每15分鐘沒訪問便會休眠，啟動需要50~60秒 <br>
- 上市櫃股票代碼只更新到2025/01/05，在此之後才上市櫃的個股皆無法查詢 <br>

## 🛠️使用技術
- **前端：** Vue.js
- **後端：** Node.js（Express）
- **數據來源：**
  - 台灣證券交易所 API
  - Yahoo Finance API
- **數據儲存：** 使用localStorage達成偽資料庫的效果
- **部署：**
  - 前端：GitHub Pages
  - 後端：Render

## ✨功能特色
- **查詢台股大盤指數（如加權指數）** 
- **搜尋個股資訊（如目前價格、五檔買賣、成交量等）** 
- **收藏最愛功能：** 最愛功能可以讓使用者快速查找關注的個股 
- **響應式設計：** 適配手機移動端以及桌面瀏覽器
- **PWA設計：** 提供類似APP的操作體驗

## 實際畫面
### 電腦版
▼ 電腦預覽畫面
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E9%9B%BB%E8%85%A6%E9%A0%90%E8%A6%BD%E7%95%AB%E9%9D%A2%EF%BC%88%E7%84%A1%E6%9C%80%E6%84%9B%E4%BF%AE%E6%AD%A3%EF%BC%89.png" alt="電腦預覽畫面（無最愛修正）">

▼ 若有股票在最愛內
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E9%9B%BB%E8%85%A6%E9%A0%90%E8%A6%BD%E7%95%AB%E9%9D%A2%EF%BC%88%E6%9C%89%E6%9C%80%E6%84%9B%EF%BC%89.png" alt="電腦預覽畫面（有最愛）">

▼ 電腦查詢畫面
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E9%9B%BB%E8%85%A6%E6%9F%A5%E8%A9%A2%E7%95%AB%E9%9D%A2.png" alt="電腦查詢畫面">

### 手機版
▼ 手機預覽畫面 <br>
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E6%89%8B%E6%A9%9F%E9%A0%90%E8%A6%BD%E7%95%AB%E9%9D%A2.png" alt="手機預覽畫面" width="30%">  <br>

▼ 手機最愛區塊（右邊箭頭） <br>
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E6%89%8B%E6%A9%9F%E9%A0%90%E8%A6%BD%E7%95%AB%E9%9D%A2%EF%BC%88%E6%9C%80%E6%84%9B%EF%BC%89.png" alt="手機預覽畫面（最愛）" width="30%"> <br>

▼ 手機查詢畫面 <br>
<img src="https://github.com/Jasonwen1512/stock-view/blob/main/image/%E6%89%8B%E6%A9%9F%E6%9F%A5%E8%A9%A2%E7%95%AB%E9%9D%A2.png" alt="手機查詢畫面" width="30%"> <br>
