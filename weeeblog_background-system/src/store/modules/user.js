import { loginApi, getInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null // 存储登录后的用户的信息
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(res => {
        const { data } = res
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 恢复登录状态
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送请求
      getInfo().then(res => {
        if (typeof res === 'string') {
          // 未登录，或者 token 已经过期
          res = JSON.parse(res)
          if (res.code === 401) {
            reject(res.msg)
          }
        } else {
          commit('SET_USER', res.data)
          resolve()
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


