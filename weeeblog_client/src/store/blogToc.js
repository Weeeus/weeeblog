export default {
  namespaced: true,
  state: {
    toc: []
  },
  mutations: {
    setToc(state, payload) {
      state.toc = payload;
    }
  },
  actions: {
    updateToc(ctx, toc) {
      ctx.commit("setToc", toc);
    }
  }
}; 