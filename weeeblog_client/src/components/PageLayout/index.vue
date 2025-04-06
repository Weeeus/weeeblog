<template>
  <div class="page-container" ref="pageContainer">
    <!-- 顶部区域 -->
    <div class="typewriter-container">
      <Typewriter :title="title" :description="description" />
      <slot name="typewriter-after"></slot>
    </div>
    
    <!-- 展示区域（可选） -->
    <slot name="showcase"></slot>
    
    <!-- 内容区域 -->
    <div class="content-wrapper">
      <div class="content-container">
        <!-- 侧边栏 -->
        <div class="aside-bar-container" v-if="$slots.aside">
          <slot name="aside"></slot>
        </div>
        
        <!-- 主内容区 -->
        <div class="main-container">
          <div class="main-content-container">
            <slot></slot>
          </div>
          <FooterBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typewriter from "@/components/typewriter";
import mainScroll from "@/mixins/mainScroll.js";
import FooterBar from "@/components/FooterBar";
export default {
  name: "PageLayout",
  components: {
    Typewriter,
    FooterBar
  },
  props: {
    title: {
      type: String,
      default: "Hello"
    },
    description: {
      type: String,
      default: "Welcome to my website"
    },
    containerRef: {
      type: String,
      default: "pageContainer"
    }
  },
  mixins: [mainScroll("pageContainer")]
};
</script>

<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}

.typewriter-container {
  padding-top: 2%;
  height: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content-wrapper {
  width: 100%;
  min-height: 100vh;
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

.main-container {
  flex: 1;
  overflow: hidden;
}

.main-content-container {
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
  
  .main-content-container {
    width: 100%;
  }
}
</style> 