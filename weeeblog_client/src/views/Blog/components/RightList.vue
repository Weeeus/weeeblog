<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span 
        @click="handleClick(item)" 
        :class="{ active: item.isSelect }"
        :data-anchor="item.anchor"
      >
        {{ item.name }}
      </span>
      <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    // [ {name:"xxx", isSelect:true, children:[ {name:"yyy", isSelect: false} ] } ]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  
  .right-list-container {
    margin-left: 1em;
  }
  
  li {
    min-height: 30px; // 减小每项的高度使其更紧凑
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    
    span {
      display: inline-block;
      padding: 0 8px;
      border-radius: 4px;
      transition: all 0.3s;
      
      &:hover {
        background: rgba(0,0,0,0.05);
      }
    }
    
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}

.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>

