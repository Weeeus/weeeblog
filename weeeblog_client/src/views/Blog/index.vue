<template>
  <PageLayout>
    <!-- 展示区域 -->
    <template #showcase>
      <BlogShowcase :category="selectedCategory.name" :articleCount="selectedCategory.articleCount" />
    </template>
    
    <!-- 侧边栏 -->
    <template #aside>
      <AsideBar />
      <Profile 
        pageType="blog"
        @category-selected="handleCategorySelect"
      />
    </template>
    
    <!-- 主内容区 -->
    <BlogList />
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import AsideBar from "@/components/SiteAside/AsideBar";
import Profile from "@/components/SiteAside/profile";
import BlogList from "./components/BlogList";
import BlogShowcase from "./components/BlogShowcase";
import { getBlogCategories } from "@/api/blog.js";

export default {
  components: {
    PageLayout,
    AsideBar,
    Profile,
    BlogList,
    BlogShowcase,
  },
  data() {
    return {
      selectedCategory: {
        name: '全部',
        articleCount: 0
      }
    }
  },
  async created() {
    // 初始化时根据路由参数获取当前分类
    await this.initCategoryFromRoute();
  },
  watch: {
    // 监听路由变化，更新分类信息
    '$route': async function() {
      await this.initCategoryFromRoute();
    }
  },
  methods: {
    handleCategorySelect(category) {
      this.selectedCategory = category;
    },
    async initCategoryFromRoute() {
      const categoryId = this.$route.params.categoryId || -1;
      
      // 如果没有分类ID，或者ID为-1（全部），使用默认值
      if (!categoryId || categoryId === -1) {
        try {
          // 获取所有分类列表以计算文章总数
          const categories = await getBlogCategories();
          const totalArticleCount = categories.reduce(
            (a, b) => a + b.articleCount,
            0
          );
          this.selectedCategory = {
            name: '全部',
            articleCount: totalArticleCount
          };
        } catch (error) {
          console.error('获取分类信息失败', error);
        }
        return;
      }
      
      // 如果有分类ID，获取对应的分类信息
      try {
        const categories = await getBlogCategories();
        const currentCategory = categories.find(c => c.id == categoryId);
        if (currentCategory) {
          this.selectedCategory = {
            name: currentCategory.name,
            articleCount: currentCategory.articleCount
          };
        }
      } catch (error) {
        console.error('获取分类信息失败', error);
      }
    }
  }
};
</script>