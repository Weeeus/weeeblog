<template>
    <PageLayout>
    <!-- 展示区域 -->
    <!-- <template #showcase>
      <BlogShowcase :category="selectedCategory.name" :articleCount="selectedCategory.articleCount" />
    </template> -->
    
    <!-- 侧边栏 -->
    <template #aside>
      <AsideBar />
      <Profile pageType="home"/>
    </template>
    
    <!-- 主内容区 -->
    <ProjectList />
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import AsideBar from "@/components/SiteAside/AsideBar";
import Profile from "@/components/SiteAside/profile";
import ProjectList from "./ProjectList";
// import BlogShowcase from "@/components/BlogShowcase";
export default {
  components: {
    AsideBar,
    Profile,
    ProjectList,
    PageLayout,
    // BlogShowcase
  },
  data() {
    return {
      selectedCategory: {
        name: '项目',
        articleCount: 0
      }
    }
  }
};
</script>
