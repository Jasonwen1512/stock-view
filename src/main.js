import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "vue-devui";
import "vue-devui/style.css";
import "@devui-design/icons/icomoon/devui-icon.css";
// import { ThemeServiceInit, infinityTheme } from "devui-theme";

// ThemeServiceInit({ infinityTheme }, "infinityTheme");

createApp(App).mount("#app");
