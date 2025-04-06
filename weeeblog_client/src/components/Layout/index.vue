<template>
  <div class="layout-container">
    <!-- 头部区域 -->
    <div class="header">
      <slot name="header">
        <HeaderBar />
      </slot>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧边栏 -->
      <div class="aside" v-if="$slots.aside">
        <slot name="aside"></slot>
      </div>

      <!-- 主要内容 -->
      <div class="content" :class="{ 'has-aside': $slots.aside }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../headerBar";

export default {
  name: "Layout",
  components: {
    HeaderBar
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.aside {
  width: 250px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  overflow: auto;
  
  &.has-aside {
    padding-left: 20px;
  }
}
</style>
