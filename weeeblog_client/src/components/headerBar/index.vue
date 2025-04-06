<template>
  <nav class="menu-container" :class="{ hidden: isHidden }" :style="navStyle">
    <div class="menu-icon" @click="toggleMenu" v-if="isMobile">
      <Icon type="menu" />
    </div>
    <div class="site-name" :class="{ 'center': isMobile }">Weee's blog</div>
    <div class="nav-links" :class="{ 'mobile': isMobile }">
      <RouterLink
        :exact="item.exact"
        v-for="item in items"
        :key="item.link"
        :to="{ name: item.name }"
        active-class="selected"
        exact-active-class=""
      >
        <div class="icon">
          <Icon :type="item.icon" />
        </div>
        <span>{{ item.title }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, // 激活状态是否要精确匹配
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
      isHidden: false,
      lastScrollPosition: 0,
      scrollThreshold: 10, // 滚动多少距离后隐藏
      opacity: 0,
      windowHeight: 0,
      isMobile: false,
    };
  },
  computed: {
    navStyle() {
      return {
        backgroundColor: `rgba(152, 196, 231, ${this.opacity})`,
      };
    },
  },
  mounted() {
    // 改为监听事件总线上的mainScroll事件
    this.$bus.$on("mainScroll", this.handleMainScroll);
    this.windowHeight = window.innerHeight;
    
    // 添加窗口大小变化监听
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    // 移除事件监听
    // window.removeEventListener('scroll', this.handleScroll);
    this.$bus.$off("mainScroll", this.handleMainScroll);
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    handleMainScroll(scrollContainer) {
      if (!scrollContainer) {
        return;
      }
      const currentScrollPosition = scrollContainer.scrollTop;
      
      // 获取内容区域的位置
      const contentWrapper = document.querySelector('.content-wrapper');
      if (!contentWrapper) {
        return;
      }
      
      // 获取内容区域距离顶部的距离(减去一些偏移量,让导航栏提前隐藏)
      const contentTop = contentWrapper.getBoundingClientRect().top + scrollContainer.scrollTop - 100;
      
      // 计算透明度
      this.opacity = Math.min(currentScrollPosition / contentTop, 0.8);
      
      // 当接近或超过内容区时隐藏
      this.isHidden = currentScrollPosition >= contentTop;
      
      this.lastScrollPosition = currentScrollPosition;
    },
    
    // 检查屏幕尺寸
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 900;
    },
    
    // 切换菜单展开状态
    toggleMenu() {
      this.$emit('toggle-menu');
    }
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(152, 196, 231, 0);
  padding: 8px 20px;
  border-radius: 8px;
  margin: 0 auto;
  position: fixed;
  // top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  transition: all 0.3s ease;

  &.hidden {
    opacity: 0;
    transform: translate(-50%, -100%);
    pointer-events: none;
  }

  .menu-icon {
    display: none;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    margin-left: 3%;
    
    @media (max-width: 900px) {
      display: block;
      position: absolute;
      left: 20px;
    }
  }

  .site-name {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-left: 3em;
    letter-spacing: 1px;
    transition: all 0.3s;
    position: absolute;
    // z-index: 20;
    left: 0;
    
    &.center {
      position: relative;
      margin: 0 auto;
      left: auto;
    }
    
    &:hover {
      color: #a19d9d;
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    transition: all 0.3s ease;
    
    &.mobile {
      display: none;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
    padding: 8px 20px;
    border-radius: 6px;
    margin: 0 5px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    
    &.selected {
      background: rgba(118, 117, 121, 0.5);
      color: #cebdbd;
    }

    .icon {
      width: 20px;
      margin-right: 6px;
    }

    span {
      font-size: 16px;
    }

    &:hover {
      color: #e0dcdc;
      background: rgba(255, 255, 255, 0.08);
    }
  }
  
  @media (max-width: 900px) {
    padding: 12px 20px;
    justify-content: center;
  }
}
</style>

