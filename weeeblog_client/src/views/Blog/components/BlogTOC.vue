<template>
  <div class="blog-toc-container">
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    // 根据toc得到它们对应的元素数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          const prevActiveAnchor = this.activeAnchor;
          this.activeAnchor = dom.id;
          
          // 只在激活锚点改变时触发滚动
          if (prevActiveAnchor !== dom.id) {
            this.$nextTick(() => {
              // 使用更精确的选择器
              const activeElement = this.$el.querySelector(`span[data-anchor="${dom.id}"]`);
              if (activeElement) {
                const container = this.$el;
                
                // 获取元素相对于容器的位置
                const elementRect = activeElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const relativeTop = elementRect.top - containerRect.top;
                
                // 计算需要滚动的位置
                const scrollTo = container.scrollTop + relativeTop - (container.clientHeight / 2) + (elementRect.height / 2);
                
                container.scrollTo({
                  top: scrollTo,
                  behavior: 'smooth'
                });
              }
            });
          }
          return;
        } else if (top > range) {
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  max-height: 400px;
  overflow-y: auto; // 允许垂直滚动
  scroll-behavior: smooth; // 平滑滚动效果
  
  // 隐藏滚动条但保持可滚动
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

