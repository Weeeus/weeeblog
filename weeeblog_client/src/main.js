import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage";
import "./eventBus";
import store from "./store";
Vue.prototype.$showMessage = showMessage;

// 注册全局指令
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

store.dispatch("setting/fetchSetting").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});

