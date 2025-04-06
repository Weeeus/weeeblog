<template>
  <div class="home-container" ref="homeContainer">
    <div class="typewriter-container">
      <Typewriter title="Hello" description="Welcome to my website" />
      <div class="icon icon-down" @click="handleScrollDown">
        <Icon type="arrowDown" />
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-container">
        <div class="aside-bar-container">
          <AsideBar />
          <Profile pageType="home"/>
        </div>
        <div class="main-content">
          <div class="blog-list-container">
            <BlogList />
          </div>
          <FooterBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typewriter from "@/components/typewriter";
import AsideBar from "@/components/SiteAside/AsideBar";
import Profile from "@/components/SiteAside/profile";
import BlogList from "../Blog/components/BlogList";
import mainScroll from "@/mixins/mainScroll.js";
import Icon from "@/components/Icon";
import FooterBar from "@/components/FooterBar";
export default {
  components: {
    Typewriter,
    AsideBar,
    Profile,
    BlogList,
    Icon,
    FooterBar,
  },
  mixins: [mainScroll("homeContainer")],
  methods: {
    handleScrollDown() {
      this.$bus.$emit("setMainScroll", window.innerHeight);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}

.icon{
  .self-center();
  font-size: 30px;
  @gap: 25px;
  color: #fff;
  cursor: pointer;
  transform: translateX(-50%);
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
}
.typewriter-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content-wrapper {
  width: 100%;
  min-height: 100vh;
  // background: rgba(255, 255, 255, 0.9);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;
}

.aside-bar-container {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  flex: 1;
  overflow: hidden;
}

.blog-list-container {
  flex: 1;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

@media screen and (max-width: 900px) {
  .content-container {
    padding: 10px;
  }
  
  .aside-bar-container {
    display: none;
  }
  
  .blog-list-container {
    width: 100%;
  }
}
</style>
