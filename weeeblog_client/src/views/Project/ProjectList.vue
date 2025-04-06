<template>
  <div class="project-container" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <a
        :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
        :target="item.url ? '_blank' : '_self'"
      >
        <img class="thumb" v-lazy="item.thumb" />
      </a>
      <div class="info">
        <h2>
          <a
            :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
            :target="item.url ? '_blank' : '_self'"
          >
            {{ item.name }}
          </a>
        </h2>
        <a class="github" target="_blank" :href="item.github" v-if="item.github">github</a>
        <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
      </div>
    </div>
    <!-- <Empty v-if="data.rows.length === 0 && !isLoading" /> -->
  </div>
</template>

<script>
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
import { mapState } from "vuex";
export default {
  components: {
    Empty,
  },
  // mixins: [mainScroll("projectContainer")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  
  // 移动端适配
  @media (max-width: 900px) {
    padding: 15px 10px;
  }
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  height: 200px;
  overflow: hidden;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .thumb {
    width: 250px;
    min-height: 130px;
    max-height: 200px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
    align-self: center;
    overflow: hidden;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
  }
  
  // 移动端适配
  @media (max-width: 900px) {
    height: auto;
    min-height: 120px;
    flex-direction: column;
    padding: 15px;
    
    .thumb {
      width: 100%;
      height: 180px;
      max-height: 180px;
      margin-right: 0;
      margin-bottom: 10px;
    }
    
    .info {
      h2 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      
      p {
        font-size: 14px;
        margin: 5px 0;
      }
    }
    
    .github {
      display: inline-block;
      margin-bottom: 5px;
    }
    
    &:hover {
      transform: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

