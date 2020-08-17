import Vue from 'vue'
import Vuex from 'vuex'
import views from '@/store/modules/views'
import memos from '@/store/modules/memos'

Vue.use(Vuex)

export default new Vuex.Store({
  /** State : 상태 */
  state: {
  },
  /** Mutations : 동기적 변화 */
  mutations: {
  },
  /** Actions : 비동기적 변화 */
  actions: {
  },
  /** Module 등록 */
  modules: {
    views,
    memos
  }
})
