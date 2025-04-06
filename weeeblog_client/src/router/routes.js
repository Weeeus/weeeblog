export default [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/Home"),
    meta: {
      title: "首页",
    },
  },
  {
    name: "Blog",
    path: "/article",
    component: () => import("@/views/Blog"),
    meta: {
      title: "文章",
    },
  },
  {
    name: "CategoryBlog",
    path: "/article/cate/:categoryId",
    component: () => import("@/views/Blog"),
    meta: {
      title: "文章",
    },
  },
  {
    name: "BlogDetail",
    path: "/article/:id",
    component: () =>
      import("@/views/Blog/Detail"),
    meta: {
      title: "文章详情",
    },
  },
  {
    name: "Project",
    path: "/project",
    component: () =>
      import("@/views/Project"),
    meta: {
      title: "项目&效果",
    },
  },
  {
    name: "Message",
    path: "/message",
    component: () =>
      import("@/views/Message"),
    meta: {
      title: "留言板",
    },
  },
];

