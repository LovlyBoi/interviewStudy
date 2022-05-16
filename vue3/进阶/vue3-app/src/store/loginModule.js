export default {
 namespaced: true,
 state: {
   user: null,
   loading: false
 },
 actions: {
  async login({ commit }, userInfo) {
   new Promise((res, rej) => {
    commit("setLoading", true);
    setTimeout(() => {
     commit("setUser", { name: "alice" });
     commit("setLoading", false);
     res(true)
    }, 2000)
   })
  }
 },
 mutations: {
  setUser: (state, payload) => {
   console.log("state", state, payload);
   state.user = payload;
  },
  setLoading: (state, payload) => {
   state.loading = payload
  }
 },
}