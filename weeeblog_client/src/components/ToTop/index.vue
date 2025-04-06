<template>
  <div class="to-top-wrapper" v-show="show">
    <div @click="handleClick" class="to-top-container">
      <div class="icon icon-down">
        <Icon type="arrowUp" />
      </div>
      <span class="tooltip">回到顶部</span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      // 回到顶部
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-wrapper {
  position: fixed;
  z-index: 99;
  right: 30px;
  bottom: 30px;
}

.to-top-container {
  background: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;

  &:hover {
    background: @primary;
    .tooltip {
      visibility: visible;
      opacity: 1;
    }
    .iconfont {
      color: #fff;
    }
  }


  .tooltip {
    position: absolute;
    right: 35px;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;

    &::after {
      content: '';
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 6px solid rgba(0, 0, 0, 0.7);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
}
</style>

