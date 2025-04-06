<template>
  <div class="aside-wrapper">
    <h1 class="blog-title">Weee's Blog</h1>
    <nav class="aside-bar-container">
      <RouterLink
        v-for="item in items"
        :key="item.name"
        :to="{ name: item.name }"
        active-class="selected"
      >
        <div class="icon">
          <Icon :type="item.icon" />
        </div>
        <span>{{ item.title }}</span>
      </RouterLink>
    </nav>
  </div>
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
          name: "Blog",
          title: "文章",
          icon: "blog",
        },
        {
          name: "Project", 
          title: "项目",
          icon: "code",
        },
        {
          name: "Message",
          title: "留言", 
          icon: "chat",
        }
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.aside-wrapper {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  width: 240px;
  .blog-title {
    color: #333;
    font-size: 20px;
    margin: 0;
    text-align: center;
    padding: 10px 0;
    border-radius: 12px;
    // margin-bottom: 10px;
  }
}

.aside-bar-container {
  padding: 8px;
  border-top: 1px solid #7e7676;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    transition: 0.3s;
    border-radius: 8px;

    &.selected {
      background: rgba(0, 0, 0, 0.05);
      color: #333;
    }

    .icon {
      width: 24px;
      margin-right: 10px;
    }

    &:hover {
      color: #333;
      background: rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
