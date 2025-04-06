<template>
  <div class="blog-showcase">
    <div class="showcase-content">
      <div class="category-info">
        <div class="category-label">分类：</div>
        <div class="category-name">{{ category }}</div>
      </div>
      <div class="article-count">
        <i class="iconfont icon-article"></i>
        <span>{{ articleCount }} 篇文章</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogShowcase",
  props: {
    category: {
      type: String,
      default: "文章"
    },
    articleCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.blog-showcase {
  max-width: 1200px;
  height: 120px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.showcase-content {
  text-align: center;
}

.category-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
}

.category-label {
  color: #5c564a;
}

.category-name {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
}

.article-count {
  color: #5c564a;
  font-size: 15px;
  
  i {
    margin-right: 5px;
  }
}
</style> 