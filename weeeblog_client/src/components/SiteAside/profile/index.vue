<template>
  <div class="profile-wrapper">
    <!-- 添加导航切换 -->
    <div class="nav-tabs">
      <div 
        v-for="tab in visibleTabs" 
        :key="tab.name"
        :class="['tab-item', { active: currentTab === tab.name }]"
        @click="currentTab = tab.name"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 个人简介部分 -->
    <div v-show="currentTab === 'profile'" class="profile-container">
      <div class="avatar-item">
        <Avatar v-if="data && data.avatar" :url="data.avatar" />
      </div>
      <h1 class="username">{{ username }}</h1>
      <p class="description">. . . {{ description }} . . .</p>
      
      <div class="stats">
        <div class="stat-item" @click="navigateTo('Blog')">
          <div class="stat-number">{{ articles }}</div>
          <div class="stat-label">文章</div>
        </div>
        <div class="stat-item" @click="navigateTo('Blog')">
          <div class="stat-number">{{ categories }}</div>
          <div class="stat-label">分类</div>
        </div>
        <div class="stat-item" @click="navigateTo('Project')">
          <div class="stat-number">{{ tags }}</div>
          <div class="stat-label">项目</div>
        </div>
      </div>

      <div class="links">
        <Contact />
      </div>
    </div>

    <!-- 分类部分 -->
    <div v-show="currentTab === 'categories'" class="categories-container">
       <div class="categories-item">
          <BlogCategory @category-click="onCategoryClick"/>
       </div>
    </div>

    <!-- 文章目录部分 -->
    <div v-show="currentTab === 'toc'" class="toc-container">
      <BlogTOC :toc="toc" />
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";   
import { mapState } from "vuex";
import BlogCategory from "@/views/Blog/components/BlogCategory";
import BlogTOC from "@/views/Blog/components/BlogTOC";
import Contact from "@/components/SiteAside/Contact";
import { getBlogCategories } from "@/api/blog.js";
export default {
  components: {
    Avatar,
    BlogCategory,
    BlogTOC,
    Contact,
  },
  props: {
    // 添加页面类型属性
    pageType: {
      type: String,
      default: 'home', // home, blog, article
      validator: value => ['home', 'blog', 'article'].includes(value)
    },
    toc: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTab: 'profile',
      avatarUrl: '',
      username: 'Weee',
      description: '遇事不决，可问春风',
      articles: 0,
      categories: 0,
      blogCategories: [],
    };
  },
  computed: {
    ...mapState("setting", ["data"]),
    ...mapState("project", { projectData: "data" }),
    // 根据页面类型显示不同的导航选项
    visibleTabs() {
      const tabs = [
        { name: 'profile', label: '个人简介' }
      ];
      
      if (this.pageType === 'article') {
        tabs.unshift({ name: 'toc', label: '目录' });
      }
      
      if (this.pageType === 'blog') {
        tabs.unshift({ name: 'categories', label: '分类' });
      }
      
      return tabs;
    },
    // 使用项目数据作为标签数量
    tags() {
      return this.projectData?.length || 0;
    }
  },
  created() {
    this.fetchData();
    // 确保项目数据已经加载
    if (this.projectData?.length === 0) {
      this.$store.dispatch("project/fetchProject");
    }
  },
  watch: {
    // 当页面类型改变时，重置当前标签为第一个可见标签
    pageType: {
      immediate: true,
      handler() {
        this.currentTab = this.visibleTabs[0].name;
      }
    },
    // 监听项目数据变化
    projectData: {
      immediate: true,
      handler() {}
    },
    // 监听博客分类数据变化
    blogCategories: {
      immediate: true,
      handler(categories) {
        if (categories && categories.length > 0) {
          this.categories = categories.length;
          this.articles = categories.reduce((total, category) => total + category.articleCount, 0);
        }
      }
    }
  },
  methods: {
    onCategoryClick(category) {
      this.$emit('category-selected', category);
    },
    async fetchData() {
      try {
        const categories = await getBlogCategories();
        this.blogCategories = categories;
      } catch (error) {
        console.error('获取数据失败', error);
      }
    },
    navigateTo(routeName) {
      // 检查当前路由是否已经是目标路由，避免重复导航
      if (this.$route.name === routeName) {
        return;
      }
      
      this.$router.push({ name: routeName }).catch(err => {
        // 捕获并忽略NavigationDuplicated错误，其他错误继续抛出
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
      this.$emit('nav-click');
    }
  }
};
</script>

<style lang="less" scoped>
.profile-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  width: 240px;
  position: sticky;
  top: 3%;
  z-index: 1000;

  .nav-tabs {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: center;
    .tab-item {
      padding: 12px 16px;
      cursor: pointer;
      color: #666;
      position: relative;
      transition: color 0.3s;
      
      &:hover {
        color: #007bff;
      }
      
      &.active {
        color: #007bff;
        
        &:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #007bff;
        }
      }
    }
  }

  .profile-container {
    text-align: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    position: sticky;
    top: 0;
    z-index: 1000;

    .avatar-item {
      display: flex;
      justify-content: center;
    }

    .username {
      font-size: 1.2em;
      margin: 12px 0 8px;
      color: #333;
    }

    .description {
      color: #666;
      font-size: 0.9em;
      margin: 8px 0;
    }

    .stats {
      display: flex;
      justify-content: space-around;

      .stat-item {
        flex: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          
          .stat-number, .stat-label {
            color: #007bff;
          }
        }

        .stat-number {
          font-size: 1.2em;
          font-weight: bold;
          color: #333;
          transition: color 0.3s;
        }

        .stat-label {
          font-size: 0.9em;
          color: #666;
          transition: color 0.3s;
        }
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
      border-top: 1px solid #eee;
    }
  }
}
</style>