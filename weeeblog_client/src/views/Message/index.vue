<template>
    <PageLayout>
    <!-- 侧边栏 -->
    <template #aside>
      <AsideBar />
      <Profile pageType="home"/>
    </template>
    
    <!-- 主内容区 -->
    <MessageList />
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout";
import AsideBar from "@/components/SiteAside/AsideBar";
import Profile from "@/components/SiteAside/profile";
import MessageList from "./MessageList";
export default {
  components: {
    AsideBar,
    Profile,
    MessageList,
    PageLayout,
  },
};
</script>
