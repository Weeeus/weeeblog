<template>
    <PageLayout>
    <!-- 侧边栏 -->
    <template #aside>
      <Profile pageType="article" :toc="data.toc"/>
    </template>
    
    <!-- 主内容区 -->
    <div class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="!isLoading && data" />
      <Gitalk 
        v-if="!isLoading && data.id" 
        :id="data.id"
        :title="data.title"
      />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import Gitalk from "@/components/Gitalk";
import { titleController } from "@/utils";
import Typewriter from "@/components/typewriter";
import Profile from "@/components/SiteAside/profile";
import { mapActions } from "vuex";

export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    Gitalk,
    Typewriter,
    Profile,
    PageLayout,
  },
  mixins: [fetchData({ toc: [], id:''})],
  methods: {
    ...mapActions("blogToc", ["updateToc"]),
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      titleController.setRouteTitle(resp.title);
      this.updateToc(resp.toc || []);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  beforeDestroy() {
    // 在组件销毁前清空toc数据
    this.updateToc([]);
  }
};
</script>

<style scoped lang="less">
.main-container {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
</style>

