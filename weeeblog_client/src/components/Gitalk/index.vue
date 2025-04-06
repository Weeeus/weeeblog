<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
export default {
  name: 'Gitalk',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    const gitalk = new Gitalk({
      clientID: 'Ov23liq1QtiiiEYJz1MH', // 从 GitHub Application 获取
      clientSecret: 'f1036149263133dc9f09c5501ada5c74c15797e3', // 从 GitHub Application 获取
      repo: 'gitalk-comments', // 存储评论的仓库名
      owner: 'Weeeus', // 仓库的创建者
      admin: ['Weeeus'], // 仓库管理员
      id: this.id.toString(), // 页面唯一标识
      title: this.title,
      distractionFreeMode: false
    })

    gitalk.render('gitalk-container')
  }
}
</script>

<style scoped lang="less">
.gitalk-container {
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin: 20px 0;
}
</style> 