<template>
  <div class="app-container" @click="handleOutsideClick" :class="{ 'no-scroll': isMobileMenuVisible }">
    <div class="header">
      <HeaderBar @toggle-menu="toggleMobileMenu" />
    </div>
    <RouterView />
    <ToTop />
    <div class="mobile-aside" :class="{ 'show': isMobileMenuVisible }">
        <SiteAside @nav-click="closeMobileMenu" :pageType="currentPageType" :toc="currentToc" />
    </div>
    <div class="overlay" v-if="isMobileMenuVisible" @click="closeMobileMenu"></div>
  </div>
</template>

<script>
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";
import HeaderBar from "./components/headerBar";
import { mapState } from "vuex";

export default {
  components: {
    SiteAside,
    ToTop,
    HeaderBar,
  },
  data() {
    return {
      isMobileMenuVisible: false
    }
  },
  computed: {
    ...mapState("blogToc", ["toc"]),
    currentToc() {
      return this.toc;
    },
    currentPageType() {
      const path = this.$route.path;
      if (path.startsWith('/article/') && !path.includes('/cate/')) {
        return 'article';
      } else if (path.startsWith('/article') || path.includes('/cate/')) {
        return 'blog';
      } else {
        return 'home';
      }
    }
  },
  watch: {
    '$route'() {
      // 当路由变化时关闭移动菜单
      this.closeMobileMenu();
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    },
    closeMobileMenu() {
      this.isMobileMenuVisible = false;
    },
    handleOutsideClick(e) {
      // 如果点击的不是侧边栏内部元素且侧边栏是可见的，则关闭侧边栏
      if (this.isMobileMenuVisible && !e.target.closest('.mobile-aside') && !e.target.closest('.menu-icon')) {
        this.closeMobileMenu();
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
  background-image: url("./assets/bg1.png");
  background-size: cover;
  background-position: center;
  
  &.no-scroll {
    overflow: hidden;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: block;
}

.mobile-aside {
  display: none;
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  transition: left 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  &.show {
    left: 0;
  }
  @media (max-width: 900px) {
    display: block;
  }
}
</style>

