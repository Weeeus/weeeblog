<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye",
  menu: "icon-caidan",
  success: "icon-zhengque",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxi",
  blog: "icon-boke",
  code: "icon-code",
  about: "icon-guanyu",
  weixin: "icon-weixin",
  mail: "icon-email",
  github: "icon-github-fill",
  qq: "icon-QQ",
  arrowUp: "icon-arrowup",
  arrowDown: "icon-arrowdown",
  empty: "icon-empty",
  chat: "icon-liuyan",
};
export const types = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 图标类样式
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4842839_vd8hics86og.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>

