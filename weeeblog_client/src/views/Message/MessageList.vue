<template>
  <div class="message-container" ref="messageContainer">
    <div class="gitalk-wrapper">
      <h1>留言板</h1>
      <Gitalk title="留言板" id="message-page" />
    </div>
  </div>
</template>

<script>
import Gitalk from "@/components/Gitalk";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    Gitalk,
  },
  mixins: [mainScroll("messageContainer")],
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.gitalk-wrapper {
  width: 90%;
  margin: 0 auto;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

