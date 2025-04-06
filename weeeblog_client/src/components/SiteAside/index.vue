<template>
  <div class="site-aside-container">
    <div class="quote-container">
      <div class="quote-subtitle">片刻</div>
      <div class="quote-subcontent">天下之事常成于困约，而败于奢靡</div>
    </div>
    <div class="nav-container">
      <router-link to="/" class="nav-item" @click.native="handleNavClick">
        <Icon type="home" />
        <span>首页</span>
      </router-link>
      <router-link to="/article" class="nav-item" @click.native="handleNavClick">
        <Icon type="blog" />
        <span>文章</span>
      </router-link>
      <router-link to="/Project" class="nav-item" @click.native="handleNavClick">
        <Icon type="chat" />
        <span>项目</span>
      </router-link>
      <router-link to="/message" class="nav-item" @click.native="handleNavClick">
        <Icon type="code" />
        <span>留言</span>
      </router-link>
    </div>
    <div class="tab-container">
      <Profile :pageType="pageType" :toc="toc"/>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import Profile from "./profile";

export default {
  components: {
    Avatar,
    Icon,
    Profile
  },
  props: {
    pageType: {
      type: String,
      default: 'home'
    },
    toc: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleNavClick() {
      this.$emit('nav-click');
    }
  }
};
</script>

<style lang="less" scoped>
.site-aside-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  max-height: 100vh;
  overflow-y: auto;
  position: absolute;
  z-index: 100;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.quote-container {
  background-color: #87CEEB;
  color: #fff;
  padding: 15px;
  text-align: center;
  
  .quote-subtitle {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .quote-subcontent {
    font-size: 14px;
    margin-bottom: 10px;
  }
}

.nav-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  
  .nav-item {
    display: flex;
    align-items: center;
    color: #666;
    text-decoration: none;
    font-size: 12px;
    padding: 8px 20px;
    
    .iconfont {
      font-size: 16px;
      margin-right: 10px;
    }
    
    span {
      margin-left: 2px;
    }
    
    &:hover {
      color: #87CEEB;
      cursor: pointer;
    }
  }
}

.tab-container {
  padding: 0px;
}

.function-container {
  padding: 20px;
}
</style>
