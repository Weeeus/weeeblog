<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            <RouterLink
              class="desc-link"
              :to="{
                name: 'BlogDetail',
                params: {
                  id: item.id,
                },
              }"
            >
              <span>{{ item.description }}</span>
            </RouterLink>
          </div>
        </div>
      </li>
    </ul>
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
    <Empty v-if="data.rows.length === 0 && !isLoading" />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [fetchData({total: 0, rows: []}), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 5;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        // 当前没有分类
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  // overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  // 移动端适配
  @media (max-width: 900px) {
    padding: 15px 10px;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  height: 200px;
  box-sizing: border-box;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    .thumb {
      margin-right: 0;
      margin-left: 15px;
    }
  }

  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    h2 {
      margin: 0;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    margin: 10px 0;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 10px 0;
    font-size: 14px;
    max-height: 42px; /* 大约是两行文本的高度 (14px * 1.5 * 2) */
    overflow: hidden;
    
    .desc-link {
      display: block;
      color: inherit;
      text-decoration: none;
      
      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      
      &:hover {
        color: @primary;
      }
    }
  }
  
  // 移动端适配
  @media (max-width: 900px) {
    height: auto;
    min-height: 120px;
    flex-direction: column !important;
    padding: 15px 0;
    
    &:nth-child(even) {
      .thumb {
        margin-left: 0;
      }
    }
    
    .thumb {
      margin: 0 0 10px 0;
      width: 100%;
      
      img {
        width: 100%;
        height: 180px;
      }
    }
    
    .main {
      h2 {
        font-size: 16px;
      }
    }
    
    .aside {
      display: flex;
      flex-wrap: wrap;
      margin: 8px 0;
      
      span, a {
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
    
    .desc {
      margin: 8px 0;
      max-height: 45px; /* 移动端两行文本高度稍小 */
    }
  }
}
</style>

